const errorHandler = require('../helpers/errorHandler')
const pool = require('../db')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const keys = require('../keys')
const {validationResult} = require('express-validator')

module.exports.AuthUser = async (req, res) => {
    try {
        // let userByLogin = await pool.query("SELECT * FROM users WHERE login = $1", [login]);
        // if (userByLogin.rows.length) {
        //
        // } else res.status(404).json({message: "User wasn't found"})
    } catch (e) {
        errorHandler(res, e)
    }
}
module.exports.LoginUser = async (req, res) => {
    try {
        let userByLogin = await pool.query("SELECT * FROM users WHERE login = $1", [req.body.login]);
        let user = userByLogin.rows[0];
        if (userByLogin.rows.length) {
            const passwordSync = bcrypt.compareSync(req.body.password, user.password)
            if (passwordSync) {
                const token = jwt.sign({
                    login: user.login,
                    userId: user.id
                }, keys.jwt, {expiresIn: 60 * 60})
                res.json({token: `Bearer ${token}`})
            } else res.status(401).json({message: "Wrong login or password"})
        } else res.status(404).json({message: "User wasn't found"})
    } catch (e) {
        errorHandler(res, e)
    }
}
module.exports.RegisterUser = async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(404).json(errors.errors)
    }
    let {username, login, password, status} = req.body
    const cryptedPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
    try {
        let userByLogin = await pool.query("SELECT * FROM users WHERE login = $1", [login]);
        if (!userByLogin.rows.length) {
            if (!username) username = login;
            let data = await pool.query("INSERT INTO users (username, login, password, status) VALUES($1, $2, $3, $4) RETURNING *", [username, login, cryptedPassword, status])
            res.json(data.rows[0])
        } else res.json({message: "User with this login already exist"})
    } catch (e) {
        errorHandler(res, e)
    }
}
module.exports.LogoutUser = async (req, res) => {
    try {
        // let data = await pool.query("")
        res.status(200).json({code: 0})
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