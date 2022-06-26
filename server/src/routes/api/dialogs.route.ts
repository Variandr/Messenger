// TODO: use sockets instead
import { Router } from "express";
import dialogsController from "../../controllers/dialogs.controller";
import authMiddleware from "../../middleware/auth.middleware";
import asyncMiddleware from "../../middleware/async.middleware";
import sendSuccess from "../../middleware/success.middleware";
import validateBody from "../../middleware/validate.middleware";
import { AddMemberSchema, NewChatSchema } from "../schema";

const dialogsRouter: Router = Router();

dialogsRouter.use(authMiddleware);
dialogsRouter.post(
  "/",
  validateBody(NewChatSchema),
  asyncMiddleware(dialogsController.CreateChat.bind(dialogsController)),
  sendSuccess
);
dialogsRouter.put(
  "/:chatId",
  validateBody(AddMemberSchema),
  asyncMiddleware(dialogsController.AddParticipant.bind(dialogsController)),
  sendSuccess
);
export default dialogsRouter;
