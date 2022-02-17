const profileService = require("../services/profileService");
const pool = require("../db");

module.exports.EditUsername = async (req, res, next) => {
    try {
        const {username, id} = req.body
        let data = await profileService.editUsername(username, id)
        return res.status(200).json(data)
    } catch (e) {
        next(e)
    }
}

module.exports.EditStatus = async (req, res, next) => {
    try {
        const {status, id} = req.body
        let data = await profileService.editStatus(status, id)
        return res.status(200).json(data)
    } catch (e) {
        next(e)
    }
}

module.exports.GetUsers = async (req, res, next) => {
    try {
        let data = await pool.query("SELECT id, login, username, status FROM users");
        res.json(data.rows)
    } catch (e) {
        next(e)
    }
}

module.exports.GetProfile = async (req, res, next) => {
    try {
        let data = await pool.query("SELECT id, login, username, status FROM users WHERE id = $1", [req.params.userId]);
        res.json(data.rows[0])
    } catch (e) {
        next(e)
    }
}