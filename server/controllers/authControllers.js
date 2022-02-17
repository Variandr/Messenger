const pool = require('../db')
const {validationResult} = require('express-validator')
const userService = require('../services/authService')


module.exports.RegisterUser = async (req, res, next) => {
    try {
        const errors = validationResult(req)
        if (!errors.isEmpty()) return res.status(404).json(errors.errors)
        let {username, login, password, remember} = req.body
        let data = await userService.registration(username, login, password)
        if(remember) {
            res.cookie('refreshToken', data.refreshToken, {maxAge: 14 * 24 * 60 * 60 * 1000, httpOnly: true})
        }
        return res.json(data)
    } catch (e) {
        next(e)
    }
}

module.exports.LoginUser = async (req, res, next) => {
    try {
        const {login, password, remember} = req.body
        let data = await userService.login(login, password)
        if(remember) {
            res.cookie('refreshToken', data.refreshToken, {maxAge: 14 * 24 * 60 * 60 * 1000, httpOnly: true})
        }
        return res.json(data)
    } catch (e) {
        next(e)
    }
}

module.exports.LogoutUser = async (req, res, next) => {
    try {
        const {refreshToken} = req.cookies
        await userService.logout(refreshToken)
        res.clearCookie('refreshToken')
        return res.json()
    } catch (e) {
        next(e)
    }
}

module.exports.RefreshToken = async (req, res, next) => {
    try {
        const {refreshToken} = req.cookies
        let data = await userService.refresh(refreshToken)
        res.cookie('refreshToken', data.refreshToken, {maxAge: 14 * 24 * 60 * 60 * 1000, httpOnly: true})
        return res.json(data)
    } catch (e) {
        next(e)
    }
}