const authMiddleWare = require("../middleware/authMiddleware");
const dialogsService = require("../services/dialogsService");

module.exports = (socket, io) => {
  let user = socket.request.user;
  io.use((socket, next) =>
    authMiddleWare(socket.request, socket.request.res, next)
  );
  if (user) {
    socket.on("dialogs:join", async () => {
      socket.join(user.userId);
      let data = await dialogsService.getDialogs(user.userId);
      io.in(user.userId).emit("dialogs", data);
    });
    socket.on("chat:join", async ({ chatId }) => {
      await dialogsService.setOnlineStatus(true, user.userId);
      socket.join(chatId);
      let messages = await dialogsService.getChatMessages(chatId);
      let dateMessages = null;
      messages.map((m) => {
        if (dateMessages) {
          const find = dateMessages.find(
            (f) => f.date.slice(0, 10) === m.created_at.slice(0, 10)
          );
          if (find) {
            dateMessages = dateMessages.map((f) => {
              if (f.date.slice(0, 10) === m.created_at.slice(0, 10))
                return { ...f, messages: [...f.messages, m] };
              return f;
            });
          } else
            dateMessages = [
              ...dateMessages,
              { date: m.created_at, messages: [m] },
            ];
        } else dateMessages = [{ date: m.created_at, messages: [m] }];
      });
      let sortedMessages = dateMessages
        .map((m) => {
          let messages = m.messages.sort((a, b) => {
            return new Date(a.created_at) - new Date(b.created_at);
          });
          return { ...m, messages: messages };
        })
        .sort((a, b) => {
          return new Date(a.date) - new Date(b.date);
        });
      let chatData = await dialogsService.getChatInfo(chatId);
      let chatUsers = await dialogsService.getChatUsers(chatData.id);
      io.in(chatId).emit("chatData", {
        ...chatData,
        messages: sortedMessages,
        chatMembers: chatUsers,
      });
    });
    socket.on("chat:sendMessage", async ({ chatId, message }) => {
      let messageData = await dialogsService.postMessage(
        chatId,
        message,
        user.userId
      );
      io.in(chatId).emit("message", {
        type: "send-message",
        data: messageData,
      });
    });
    socket.on("chat:changeMessage", async ({ chatId, msgId, message }) => {
      let messageData = await dialogsService.updateMessage(
        msgId,
        message,
        user.userId
      );
      io.in(chatId).emit("message", {
        type: "change-message",
        data: messageData,
      });
    });
    socket.on("chat:deleteMessage", async ({ chatId, msgId }) => {
      let messageData = await dialogsService.deleteMessage(msgId);
      io.in(chatId).emit("message", {
        type: "delete-message",
        data: messageData,
      });
    });
    socket.on("disconnect", async () => {
      await dialogsService.setOnlineStatus(false, user.userId);
      console.log("User disconnected");
    });
  }
};
