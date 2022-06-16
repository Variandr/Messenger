import { Router } from "express";
import profileController from "../../controllers/profile.controller";
import authMiddleware from "../../middleware/auth.middleware";

const profileRouter = Router();

profileRouter.put("/username", authMiddleware, profileController.EditUsername.bind(profileController));
profileRouter.put("/avatar", authMiddleware, profileController.EditImage.bind(profileController));
profileRouter.put("/status", authMiddleware, profileController.EditStatus.bind(profileController));
profileRouter.get("/users", profileController.GetUsers.bind(profileController));
profileRouter.get("/:userId", profileController.GetProfile.bind(profileController));
export default profileRouter;
