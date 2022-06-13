const pool = require("../db");
const bcrypt = require("bcrypt");
const tokenService = require("./tokenService");
const errorHandler = require("../helpers/error-handler");

class AuthService {
  async login(login, password) {
    let userByLogin = await pool.query("SELECT * FROM users WHERE login = $1", [
      login,
    ]);
    let user = userByLogin.rows[0];
    if (userByLogin.rows.length) {
      const passwordSync = bcrypt.compareSync(password, user.password);
      if (passwordSync) {
        const tokens = tokenService.generateTokens({
          login: user.login,
          userId: user.id,
        });
        await tokenService.saveToken(user.id, tokens.refreshToken);
        return {
          ...tokens,
          user: {
            id: user.id,
            login: user.login,
            username: user.username,
          },
        };
      } else throw errorHandler.BadRequest("Wrong login or password");
    } else throw errorHandler.BadRequest("User wasn't found");
  }

  async registration(username, login, password) {
    const cryptoPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
    let userByLogin = await pool.query("SELECT * FROM users WHERE login = $1", [
      login,
    ]);
    if (!userByLogin.rows.length) {
      if (!username) username = login;
      let data = await pool.query(
        "INSERT INTO users (username, login, password) VALUES($1, $2, $3) RETURNING id, login, username",
        [username, login, cryptoPassword]
      );
      const user = data.rows[0];
      const tokens = tokenService.generateTokens({
        login: user.login,
        userId: user.id,
      });
      await tokenService.saveToken(user.id, tokens.refreshToken);
      return { ...tokens, user: user };
    } else throw errorHandler.BadRequest("User with this login already exist");
  }

  async logout(refreshToken) {
    await tokenService.removeToken(refreshToken);
  }

  async refresh(refreshToken) {
    if (!refreshToken) {
      throw errorHandler.UnauthorizedError();
    }
    const tokenData = tokenService.validateRefreshToken(refreshToken);
    const isTokenInDB = await tokenService.searchForRefreshTokenDB(
      refreshToken
    );
    if (!tokenData || !isTokenInDB) {
      throw errorHandler.UnauthorizedError();
    }
    const userByLogin = await pool.query(
      "SELECT id, login FROM users WHERE id = $1",
      [tokenData.userId]
    );
    const user = userByLogin.rows[0];
    const tokens = tokenService.generateTokens({
      login: user.login,
      userId: user.id,
    });
    await tokenService.saveToken(user.id, tokens.refreshToken);
    return { ...tokens, user };
  }
}

module.exports = new AuthService();
