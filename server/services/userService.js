const pool = require("../db");
const bcrypt = require("bcrypt");
const tokenService = require('./tokenService')

class UserService {
    async login(login, password) {
        let userByLogin = await pool.query("SELECT * FROM users WHERE login = $1", [login]);
        let user = userByLogin.rows[0];
        if (userByLogin.rows.length) {
            const passwordSync = bcrypt.compareSync(password, user.password)
            if (passwordSync) {
                const tokens = tokenService.generateTokens({login: user.login, userId: user.id})
                await tokenService.saveToken(user.id, tokens.refreshToken)
                return {...tokens, user: user}
            } else return {message: "Wrong login or password"}
        } else return {message: "User wasn't found"}
    }

    async registration(username, login, password, status) {
        const cryptoPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
        let userByLogin = await pool.query("SELECT * FROM users WHERE login = $1", [login]);
        if (!userByLogin.rows.length) {
            if (!username) username = login;
            let data = await pool.query("INSERT INTO users (username, login, password, status) VALUES($1, $2, $3, $4) RETURNING *", [username, login, cryptoPassword, status])
            const user = data.rows[0]
            const tokens = tokenService.generateTokens({login: user.login, userId: user.id})
            await tokenService.saveToken(user.id, tokens.refreshToken)
            return {...tokens, user: user}
        } else return {message: "User with this login already exist"}
    }
    async logout(refreshToken) {
        await tokenService.removeToken(refreshToken)
    }
}

module.exports = new UserService()