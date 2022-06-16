import { Router } from "express";
import dialogsController from "../../controllers/dialogs.controller";
import authMiddleware from "../../middleware/auth.middleware";

const dialogsRouter: Router = Router();

dialogsRouter.use(authMiddleware);
dialogsRouter.post("/", dialogsController.CreateChat.bind(dialogsController));
dialogsRouter.put(
  "/:chatId",
  dialogsController.AddParticipant.bind(dialogsController)
);
export default dialogsRouter;
