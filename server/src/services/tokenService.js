const pool = require("../db");
const jwt = require("jsonwebtoken");
const keys = require("../keys");

class TokenService {
  validateAccessToken(token) {
    try {
      return jwt.verify(token, keys.jwt_access);
    } catch (e) {
      return null;
    }
  }

  validateRefreshToken(token) {
    try {
      return jwt.verify(token, keys.jwt_refresh);
    } catch (e) {
      return null;
    }
  }

  generateTokens(payload) {
    const accessToken = jwt.sign(payload, keys.jwt_access, {
      expiresIn: "30m",
    });
    const refreshToken = jwt.sign(payload, keys.jwt_refresh, {
      expiresIn: "14d",
    });
    return { accessToken, refreshToken };
  }

  async saveToken(userId, refreshToken) {
    let existToken = await pool.query(
      "SELECT * FROM tokens WHERE user_id = $1",
      [userId]
    );
    if (existToken.rows.length) {
      const token = await pool.query(
        "UPDATE tokens SET refreshtoken = $1 WHERE user_id = $2 RETURNING *",
        [refreshToken, userId]
      );
      return token.rows[0];
    } else {
      const token = await pool.query(
        "INSERT INTO tokens (user_id, refreshToken) VALUES($1, $2) RETURNING *",
        [userId, refreshToken]
      );
      return token.rows[0];
    }
  }

  async removeToken(refreshToken) {
    await pool.query("DELETE FROM tokens WHERE refreshtoken = $1", [
      refreshToken,
    ]);
  }

  async searchForRefreshTokenDB(refreshToken) {
    let existToken = await pool.query(
      "SELECT * FROM tokens WHERE refreshtoken = $1",
      [refreshToken]
    );
    return existToken.rows[0];
  }
}

module.exports = new TokenService();