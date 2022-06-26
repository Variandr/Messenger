import { NextFunction, Request, Response } from "express";
import AuthService from "../services/auth.service";
import TokenService from "../services/token.service";

export class AuthController {
  constructor(private authService: AuthService) {}

  async RegisterUser(req: Request, res: Response, next: NextFunction) {
    const { username, login, password, remember } = req.body;
    const data = await this.authService.registration(username, login, password);
    if (remember) {
      res.cookie("refreshToken", data.refreshToken, {
        maxAge: 14 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
    }
    data ? res.json(data) : next();
  }

  async LoginUser(req: Request, res: Response, next: NextFunction) {
    const { login, password, remember } = req.body;
    const data = await this.authService.login(login, password);
    if (remember) {
      res.cookie("refreshToken", data.refreshToken, {
        maxAge: 14 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
    }
    data ? res.json(data) : next();
  }

  async LogoutUser(req: Request, res: Response, next: NextFunction) {
    const { refreshToken } = req.cookies;
    await this.authService.logout(refreshToken);
    res.clearCookie("refreshToken");
    next();
  }

  async RefreshToken(req: Request, res: Response, next: NextFunction) {
    const { refreshToken } = req.cookies;
    const data = await this.authService.refresh(refreshToken);
    res.cookie("refreshToken", data.refreshToken, {
      maxAge: 14 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });
    data ? res.json(data) : next();
  }
}

const authController = new AuthController(new AuthService(new TokenService()));
export default authController;
