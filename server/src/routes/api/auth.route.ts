import { Router } from "express";

import authController from "../../controllers/auth.controller";
import { check } from "express-validator";

const authRouter = Router();

authRouter.post(
    "/reg",
    [
        check("login", "Login need to be more then 5 and less then 20")
            .notEmpty()
            .isLength({min: 5, max: 20}),
        check("password", "Password cannot be less then 8 and more then 40")
            .notEmpty()
            .isLength({min: 8, max: 40}),
    ],
    authController.RegisterUser.bind(authController));
authRouter.post("/login", authController.LoginUser.bind(authController));
authRouter.delete("/logout", authController.LogoutUser.bind(authController));
authRouter.get("/refresh", authController.RefreshToken.bind(authController));
export default authRouter;
