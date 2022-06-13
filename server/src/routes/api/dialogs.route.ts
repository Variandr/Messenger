import { Router } from "express";
import dialogsController from "../../controllers/dialogsControllers";
import authMiddleware from "../../middleware/auth.middleware";

const dialogsRouter: Router = Router();

dialogsRouter.use(authMiddleware);
// router.get('/', controller.GetDialogs)
// router.get('/chat/:chatId', controller.GetChatData)
dialogsRouter.post("/", dialogsController.CreateChat.bind(dialogsController));
// router.post('/:chatId', controller.PostMessage)
// router.put('/message/:msgId', controller.UpdateMessage)
dialogsRouter.put(
  "/:chatId",
  dialogsController.AddParticipant.bind(dialogsController)
);
// router.delete('/message/:msgId', controller.DeleteMessage)
export default dialogsRouter;
