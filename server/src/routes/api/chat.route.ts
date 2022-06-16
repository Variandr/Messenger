import { Message, MessagesByDate } from "index";
import ApiError from "../../helpers/error-handler";
import { Socket } from "socket.io";
import TokenService from "../../services/token.service";
import { NextFunction } from "express";
import DialogsService from "../../services/dialogs.service";

const dialogsService = new DialogsService();
const tokenService = new TokenService();

// TODO: remove any type, move all logic to socket.controller
const ChatRoutes = (socket: Socket, io: any) => {
  // tslint:disable-next-line:no-console
  console.log("User connected", socket.id);
  io.use((socket: Socket, next: NextFunction) => {
    const accessToken = socket.handshake.headers.authorization;
    if (!accessToken) {
      throw ApiError.UnauthorizedError();
    }
    const user = tokenService.validateAccessToken(accessToken.split(" ")[1]);
    if (!user) {
      throw ApiError.UnauthorizedError();
    }
    // @ts-ignore
    socket.user = user;
    next();
  });
  // @ts-ignore
  const user = socket.user;
  if (user) {
    socket.on("dialogs:join", async () => {
      socket.join(user.userId.toString());
      const data = await dialogsService.getDialogs(user.userId);
      io.in(user.userId.toString()).emit("dialogs", data);
    });
    socket.on("chat:join", async ({ chatId }) => {
      // TODO: use socket.controller instead of using service directly
      await dialogsService.setOnlineStatus(true, user.userId);
      socket.join(chatId.toString());
      const messages = await dialogsService.getChatMessages(chatId);
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
      const chatData = await dialogsService.getChatInfo(chatId);
      const chatUsers = await dialogsService.getChatUsers(chatData.id);
      io.in(chatId.toString()).emit("chatData", {
        ...chatData,
        messages: sortedMessages,
        chatMembers: chatUsers,
      });
    });
    socket.on("chat:sendMessage", async ({ chatId, message }) => {
      const messageData = await dialogsService.postMessage(
        chatId,
        message,
        user.userId
      );
      io.in(chatId.toString()).emit("message", {
        type: "send-message",
        data: messageData,
      });
    });
    socket.on("chat:changeMessage", async ({ chatId, msgId, message }) => {
      const messageData = await dialogsService.updateMessage(msgId, message);
      io.in(chatId.toString()).emit("message", {
        type: "change-message",
        data: messageData,
      });
    });
    socket.on("chat:deleteMessage", async ({ chatId, msgId }) => {
      const messageData = await dialogsService.deleteMessage(msgId);
      io.in(chatId.toString()).emit("message", {
        type: "delete-message",
        data: messageData,
      });
    });
    socket.on("disconnect", async () => {
      // TODO: use socket.controller instead of using service directly
      await dialogsService.setOnlineStatus(false, user.userId);
      // tslint:disable-next-line:no-console
      console.log("User disconnected");
    });
  }
};
export default ChatRoutes;
