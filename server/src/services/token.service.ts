import { Payload } from "token";
import pool from "../../config/database";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "config";
import errorHandler from "../helpers/error-handler";

export interface UserIDJwtPayload extends JwtPayload {
    userId: number;
}

class TokenService {
    validateAccessToken(token: string | undefined) {
        if (token) {
            return <UserIDJwtPayload>jwt.verify(token, config.get("jwt_access"));
        } else throw errorHandler.UnauthorizedError();
    }

    validateRefreshToken(token: string | undefined) {
        if (token) {
            return <UserIDJwtPayload>jwt.verify(token, config.get("jwt_refresh"));
        } else throw errorHandler.UnauthorizedError();
    }

    generateTokens(payload: Payload) {
        const accessToken = jwt.sign(payload, config.get("jwt_access"), {
            expiresIn: "30m",
        });
        const refreshToken = jwt.sign(payload, config.get("jwt_refresh"), {
            expiresIn: "14d",
        });
        return {accessToken, refreshToken};
    }

    async saveToken(userId: number, refreshToken: string) {
        const existToken = await pool.query(
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

    async removeToken(refreshToken: string) {
        await pool.query("DELETE FROM tokens WHERE refreshtoken = $1", [
            refreshToken,
        ]);
    }

    async searchForRefreshTokenDB(refreshToken: string) {
        const existToken = await pool.query(
            "SELECT * FROM tokens WHERE refreshtoken = $1",
            [refreshToken]
        );
        return existToken.rows[0];
    }
}

export default TokenService;
