const profileService = require("../services/profileService");
const pool = require("../db");
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: "dgcjhgz00",
  api_key: "661143124343648",
  api_secret: "0cfqtxn2BbhpcGbFM8INzBraTV8",
});

module.exports.EditUsername = async (req, res, next) => {
  try {
    const { username } = req.body;
    let data = await profileService.editUsername(username, req.user.userId);
    return res.status(200).json(data);
  } catch (e) {
    next(e);
  }
};

module.exports.EditStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    let data = await profileService.editStatus(status, req.user.userId);
    return res.status(200).json(data);
  } catch (e) {
    next(e);
  }
};

module.exports.EditImage = async (req, res, next) => {
  try {
    await cloudinary.uploader.upload(req.body.image, function (error, result) {
      console.log(result, error);
    });
    return res.status(200).json();
  } catch (e) {
    next(e);
  }
};
module.exports.GetUsers = async (req, res, next) => {
  try {
    let data = await pool.query(
      "SELECT id, login, username, status FROM users"
    );
    res.json(data.rows);
  } catch (e) {
    next(e);
  }
};

module.exports.GetProfile = async (req, res, next) => {
  try {
    let data = await pool.query(
      "SELECT id, login, username, status FROM users WHERE id = $1",
      [req.params.userId]
    );
    res.json(data.rows[0]);
  } catch (e) {
    next(e);
  }
};
