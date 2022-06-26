// TODO: use sockets instead
import DialogsService from "../services/dialogs.service";
import { NextFunction, Request, Response } from "express";

export class DialogsController {
  constructor(private dialogsService: DialogsService) {}

  async CreateChat(req: Request, res: Response, next: NextFunction) {
    const { name, users } = req.body;
    await this.dialogsService.createChat(name, users);
    next();
  }

  async AddParticipant(req: Request, res: Response, next: NextFunction) {
    const { userId } = req.body;
    await this.dialogsService.addParticipant(req.params.chatId, userId);
    next();
  }
}

const dialogsController = new DialogsController(new DialogsService());
export default dialogsController;
