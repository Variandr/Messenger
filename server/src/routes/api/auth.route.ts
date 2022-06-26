import { Router } from "express";
import authController from "../../controllers/auth.controller";
import asyncMiddleware from "../../middleware/async.middleware";
import sendSuccess from "../../middleware/success.middleware";
import validateBody from "../../middleware/validate.middleware";
import { LoginSchema, RegisterSchema } from "../schema";

const authRouter = Router();

authRouter.post(
  "/register",
  validateBody(RegisterSchema),
  asyncMiddleware(authController.RegisterUser.bind(authController))
);
authRouter.post(
  "/login",
  validateBody(LoginSchema),
  asyncMiddleware(authController.LoginUser.bind(authController))
);
authRouter.delete(
  "/logout",
  asyncMiddleware(authController.LogoutUser.bind(authController)),
  sendSuccess
);
authRouter.get(
  "/refresh",
  asyncMiddleware(authController.RefreshToken.bind(authController))
);
export default authRouter;
