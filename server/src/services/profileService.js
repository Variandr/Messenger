const pool = require("../db");
const errorHandler = require("../helpers/error-handler");

class ProfileService {
  async editUsername(username, id) {
    try {
      let user = await pool.query(
        "UPDATE users SET username = $1 WHERE id = $2 RETURNING username",
        [username, id]
      );
      return user.rows[0];
    } catch (e) {
      throw errorHandler.BadRequest("User wasn't found");
    }
  }

  async editStatus(status, id) {
    try {
      let user = await pool.query(
        "UPDATE users SET status = $1 WHERE id = $2 RETURNING status",
        [status, id]
      );
      return user.rows[0];
    } catch (e) {
      throw errorHandler.BadRequest("User wasn't found");
    }
  }
}
module.exports = new ProfileService();
