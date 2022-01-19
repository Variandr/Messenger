const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const keys = require('../keys')
const pool = require("../db");

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: keys.jwt
}

module.exports = passport => {
    passport.use(
        new JwtStrategy(options, async (payload, done) => {
            try {
                let userByLogin = await pool.query("SELECT * FROM users WHERE id = $1", [payload.userId]);
                let user = userByLogin.rows[0];
                if (user) {
                    done(null, user)
                } else done(null, false)
            } catch (e) {
                console.log(e)
            }
        })
    )
}

