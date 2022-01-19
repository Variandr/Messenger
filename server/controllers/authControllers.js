const errorHandler = require('../helpers/errorHandler')
const pool = require('../db')
const {validationResult} = require('express-validator')
const userService = require('../services/userService')

module.exports.LoginUser = async (req, res) => {
    try {
        const {login, password} = req.body
        let data = await userService.login(login, password)
        res.cookie('refreshToken', data.refreshToken, {maxAge: 14 * 24 * 60 * 60 * 1000, httpOnly: true})
        return res.json(data)
    } catch (e) {
        errorHandler(res, e)
    }
}
module.exports.RegisterUser = async (req, res) => {
    try {
        const errors = validationResult(req)
        if (!errors.isEmpty()) return res.status(404).json(errors.errors)
        let {username, login, password, status} = req.body
        let data = await userService.registration(username, login, password, status)
        res.cookie('refreshToken', data.refreshToken, {maxAge: 14 * 24 * 60 * 60 * 1000, httpOnly: true})
        return res.json(data)
    } catch (e) {
        errorHandler(res, e)
    }
}
module.exports.LogoutUser = async (req, res) => {
    try {
        const {refreshToken} = req.cookies
        await userService.logout(refreshToken)
        res.clearCookie('refreshToken')
        return res.json({code: 0})
    } catch (e) {
        errorHandler(res, e)
    }
}
module.exports.GetUsers = async (req, res) => {
    try {
        let data = await pool.query("SELECT * FROM users");
        res.json(data.rows)
    } catch (e) {
        errorHandler(res, e)
    }
}
module.exports.RefreshToken = async (req, res) => {
    try {
        let data = await pool.query("SELECT * FROM users");
        res.json(data.rows)
    } catch (e) {
        errorHandler(res, e)
    }
}