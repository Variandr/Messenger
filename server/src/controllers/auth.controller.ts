import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import AuthService from "../services/auth.service";
import TokenService from "../services/token.service";

export class AuthController {
    constructor(private authService: AuthService) {
    }

    async RegisterUser(req: Request, res: Response, next: NextFunction) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) return res.status(404).json(errors);
            const {username, login, password, remember} = req.body;
            const data = await this.authService.registration(username, login, password);
            if (remember) {
                res.cookie("refreshToken", data.refreshToken, {
                    maxAge: 14 * 24 * 60 * 60 * 1000,
                    httpOnly: true,
                });
            }
            return res.json(data);
        } catch (e) {
            next(e);
        }
    }

    async LoginUser(req: Request, res: Response, next: NextFunction) {
        try {
            const {login, password, remember} = req.body;
            const data = await this.authService.login(login, password);
            if (remember) {
                res.cookie("refreshToken", data.refreshToken, {
                    maxAge: 14 * 24 * 60 * 60 * 1000,
                    httpOnly: true,
                });
            }
            return res.json(data);
        } catch (e) {
            next(e);
        }
    }

    async LogoutUser(req: Request, res: Response, next: NextFunction) {
        try {
            const {refreshToken} = req.cookies;
            await this.authService.logout(refreshToken);
            res.clearCookie("refreshToken");
            return res.json();
        } catch (e) {
            next(e);
        }
    }

    async RefreshToken(req: Request, res: Response, next: NextFunction) {
        try {
            const {refreshToken} = req.cookies;
            const data = await this.authService.refresh(refreshToken);
            res.cookie("refreshToken", data.refreshToken, {
                maxAge: 14 * 24 * 60 * 60 * 1000,
                httpOnly: true,
            });
            return res.json(data);
        } catch (e) {
            next(e);
        }
    }
}

const authController = new AuthController(new AuthService(new TokenService()));
export default authController;
