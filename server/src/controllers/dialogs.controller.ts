import DialogsService from "../services/dialogs.service";
import { NextFunction, Request, Response } from "express";

export class DialogsController {
    constructor(private dialogsService: DialogsService) {
    }

    async CreateChat(req: Request, res: Response, next: NextFunction) {
        try {
            const {chatName, users} = req.body;
            const data = await this.dialogsService.createChat(chatName, users);
            return res.json(data);
        } catch (e) {
            next(e);
        }
    }

    async AddParticipant(req: Request, res: Response, next: NextFunction) {
        try {
            const {userId} = req.body;
            const data = await this.dialogsService.addParticipant(req.query, userId);
            return res.json(data);
        } catch (e) {
            next(e);
        }
    }
}

const dialogsController = new DialogsController(new DialogsService());
export default dialogsController;
