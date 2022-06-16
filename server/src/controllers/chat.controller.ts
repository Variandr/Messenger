import DialogsService from "../services/dialogs.service";
import { Message, MessagesByDate } from "index";
import { Server, Socket } from "socket.io";

export class ChatController {
  constructor(private dialogsService: DialogsService) {}

  async connectDialogs(socket: Socket, io: Server) {
    socket.join(socket.data.userId.toString());
    const data = await this.dialogsService.getDialogs(socket.data.userId);
    io.in(socket.data.userId.toString()).emit("dialogs", data);
  }

  async connectChat(socket: Socket, io: Server, chatId: number) {
    await this.dialogsService.setOnlineStatus(true, socket.data.userId);
    socket.join(chatId.toString());
    const messages = await this.dialogsService.getChatMessages(chatId);
    let dateMessages: Array<MessagesByDate> = [];
    messages.map((m: Message) => {
      if (dateMessages.length) {
        const find = dateMessages.find(
          (f) => f.date.slice(0, 10) === m.created_at.slice(0, 10)
        );
        if (find) {
          dateMessages = dateMessages.map((f) => {
            if (f.date.slice(0, 10) === m.created_at.slice(0, 10))
              return {
                ...f,
                messages: [...f.messages, m],
              };
            return f;
          });
        } else
          dateMessages = [
            ...dateMessages,
            { date: m.created_at, messages: [m] },
          ];
      } else dateMessages = [{ date: m.created_at, messages: [m] }];
    });
    const sortedMessages = dateMessages
      .map((m) => {
        const messages = m.messages.sort((a, b) => {
          return (
            Number(new Date(a.created_at)) - Number(new Date(b.created_at))
          );
        });
        return { ...m, messages: messages };
      })
      .sort((a, b) => {
        return Number(new Date(a.date)) - Number(new Date(b.date));
      });
    const chatData = await this.dialogsService.getChatInfo(socket.data.userId);
    const chatUsers = await this.dialogsService.getChatUsers(chatData.id);
    io.in(chatId.toString()).emit("chatData", {
      ...chatData,
      messages: sortedMessages,
      chatMembers: chatUsers,
    });
  }

  async sendMessage(
    socket: Socket,
    io: Server,
    chatId: number,
    message: string
  ) {
    const messageData = await this.dialogsService.postMessage(
      chatId,
      message,
      socket.data.userId
    );
    io.in(chatId.toString()).emit("message", {
      type: "send-message",
      data: messageData,
    });
  }

  async changeMessage(
    io: Server,
    chatId: number,
    msgId: number,
    message: string
  ) {
    const messageData = await this.dialogsService.updateMessage(msgId, message);
    io.in(chatId.toString()).emit("message", {
      type: "change-message",
      data: messageData,
    });
  }

  async deleteMessage(io: Server, chatId: number, msgId: number) {
    const messageData = await this.dialogsService.deleteMessage(msgId);
    io.in(chatId.toString()).emit("message", {
      type: "delete-message",
      data: messageData,
    });
  }
  // TODO: use sockets for creating chat and adding participant
  // async createChat(io: Server, chatName: string, users) {
  //   try {
  //     const data = await this.dialogsService.createChat(chatName, users);
  //     return res.json(data);
  //   } catch (e) {
  //     next(e);
  //   }
  // }
  //
  // async addParticipant(io: Server, chatId: number, userId: number) {
  //   try {
  //     const data = await this.dialogsService.addParticipant(chatId, userId);
  //     return res.json(data);
  //   } catch (e) {
  //     next(e);
  //   }
  // }
  async disconnectUser(socket: Socket) {
    await this.dialogsService.setOnlineStatus(false, socket.data.userId);
    // tslint:disable-next-line:no-console
    console.log("User disconnected");
  }
}

const chatController = new ChatController(new DialogsService());
export default chatController;
