import { Router } from "express";
import profileController from "../../controllers/profile.controller";
import authMiddleware from "../../middleware/auth.middleware";
import asyncMiddleware from "../../middleware/async.middleware";
import validateBody from "../../middleware/validate.middleware";
import { EditStatusSchema, EditUsernameSchema } from "../schema";

const profileRouter = Router();
profileRouter.use(authMiddleware);
profileRouter.put(
  "/username",
  validateBody(EditUsernameSchema),
  asyncMiddleware(profileController.EditUsername.bind(profileController))
);
profileRouter.put(
  "/avatar",
  asyncMiddleware(profileController.EditImage.bind(profileController))
);
profileRouter.put(
  "/status",
  validateBody(EditStatusSchema),
  asyncMiddleware(profileController.EditStatus.bind(profileController))
);
profileRouter.get(
  "/users",
  asyncMiddleware(profileController.GetUsers.bind(profileController))
);
profileRouter.get(
  "/:userId",
  asyncMiddleware(profileController.GetProfile.bind(profileController))
);
export default profileRouter;
