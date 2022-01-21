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
                return {
                    ...tokens, user: {
                        id: user.id,
                        login: user.login,
                        username: user.username
                    },
                    code: 0
                }
            } else return {message: "Wrong login or password", code: 1}
        } else return {message: "User wasn't found", code: 1}
    }

    async registration(username, login, password) {
        const cryptoPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
        let userByLogin = await pool.query("SELECT * FROM users WHERE login = $1", [login]);
        if (!userByLogin.rows.length) {
            if (!username) username = login;
            let data = await pool.query("INSERT INTO users (username, login, password) VALUES($1, $2, $3) RETURNING id, login, username", [username, login, cryptoPassword])
            const user = data.rows[0]
            const tokens = tokenService.generateTokens({login: user.login, userId: user.id})
            await tokenService.saveToken(user.id, tokens.refreshToken)
            return {...tokens, user: user, code: 0}
        } else return {message: "User with this login already exist", code: 1}
    }

    async logout(refreshToken) {
        await tokenService.removeToken(refreshToken)
    }

    async refresh(refreshToken) {
        if (!refreshToken) return {message: "You are not authorized", code: 1}
        const tokenData = tokenService.validateRefreshToken(refreshToken)
        const isTokenInDB = await tokenService.searchForRefreshTokenDB(refreshToken)
        if (!tokenData || !isTokenInDB) return {message: "You are not authorized", code: 1}
        const userByLogin = await pool.query("SELECT id, login FROM users WHERE id = $1", [tokenData.userId]);
        const user = userByLogin.rows[0];
        const tokens = tokenService.generateTokens({login: user.login, userId: user.id})
        await tokenService.saveToken(user.id, tokens.refreshToken)
        return {...tokens, user, code: 0}
    }
}

module.exports = new UserService()