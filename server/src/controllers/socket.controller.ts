import DialogsService from "../services/dialogs.service";

// TODO: use it and remove type any
export class SocketController {
    constructor(private dialogsService: DialogsService) {
    }

    async Connect(socket: any) {
        await this.dialogsService.setOnlineStatus(true, socket.request.user.userId);
        socket.join(socket.chatId);
    }

    async Disconnect(socket: any) {
        await this.dialogsService.setOnlineStatus(false, socket.request.user.userId);
        // tslint:disable-next-line:no-console
        console.log("User disconnected");
    }
}

const socketController = new SocketController(new DialogsService());
export default socketController;
