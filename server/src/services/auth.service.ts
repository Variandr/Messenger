import pool from "../../config/database";
import bcrypt from "bcrypt";
import errorHandler from "../helpers/error-handler";
import TokenService from "./token.service";

class AuthService {
  constructor(private tokenService: TokenService) {
  }
  async login(login: string, password: string) {
    const userByLogin = await pool.query("SELECT * FROM users WHERE login = $1", [
      login,
    ]);
    const user = userByLogin.rows[0];
    if (userByLogin.rows.length) {
      const passwordSync = bcrypt.compareSync(password, user.password);
      if (passwordSync) {
        const tokens = this.tokenService.generateTokens({
          login: user.login,
          userId: user.id,
        });
        await this.tokenService.saveToken(user.id, tokens.refreshToken);
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

  async registration(username: string, login: string, password: string) {
    const cryptoPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
    const userByLogin = await pool.query("SELECT * FROM users WHERE login = $1", [
      login,
    ]);
    if (!userByLogin.rows.length) {
      if (!username) username = login;
      const data = await pool.query(
        "INSERT INTO users (username, login, password) VALUES($1, $2, $3) RETURNING id, login, username",
        [username, login, cryptoPassword]
      );
      const user = data.rows[0];
      const tokens = this.tokenService.generateTokens({
        login: user.login,
        userId: user.id,
      });
      await this.tokenService.saveToken(user.id, tokens.refreshToken);
      return { ...tokens, user: user };
    } else throw errorHandler.BadRequest("User with this login already exist");
  }

  async logout(refreshToken: string) {
    await this.tokenService.removeToken(refreshToken);
  }

  async refresh(refreshToken: string) {
    if (!refreshToken) {
      throw errorHandler.UnauthorizedError();
    }
    const tokenData = this.tokenService.validateRefreshToken(refreshToken);
    const isTokenInDB = await this.tokenService.searchForRefreshTokenDB(
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
    const tokens = this.tokenService.generateTokens({
      login: user.login,
      userId: user.id,
    });
    await this.tokenService.saveToken(user.id, tokens.refreshToken);
    return { ...tokens, user };
  }
}

export default AuthService;
