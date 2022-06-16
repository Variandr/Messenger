import { NextFunction, Request, Response } from "express";

import ApiError from "../helpers/error-handler";
import TokenService from "../services/token.service";

const tokenService = new TokenService();
const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const authorizationHeader = req.headers.authorization;
        if (!authorizationHeader) {
            return next(ApiError.UnauthorizedError());
        }
        const user = tokenService.validateAccessToken(authorizationHeader.split(" ")[1]);
        if (!user) {
            return next(ApiError.UnauthorizedError());
        }
        res.locals.user = user;
        next();
    } catch (e) {
        return next(ApiError.UnauthorizedError());
    }
};
export default authMiddleware;
