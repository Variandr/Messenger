import ApiError from "../../helpers/error-handler";
import TokenService from "../../services/token.service";
import chatController from "../../controllers/chat.controller";
import { Server, Socket } from "socket.io";

const tokenService = new TokenService();

const ChatRoutes = (socket: Socket, io: Server) => {
  // tslint:disable-next-line:no-console
  console.log("User connected", socket.id);
  io.use((socket, next) => {
    const accessToken = socket.handshake.headers.authorization;
    if (!accessToken) {
      throw ApiError.UnauthorizedError();
    }
    const user = tokenService.validateAccessToken(accessToken.split(" ")[1]);
    if (!user) {
      throw ApiError.UnauthorizedError();
    }
    socket.data.userId = user.userId;
    next();
  });
  socket.on("dialogs:join", () => chatController.connectDialogs(socket, io));
  socket.on("chat:join", ({ chatId }) =>
    chatController.connectChat(socket, io, chatId)
  );
  socket.on("chat:sendMessage", ({ chatId, message }) =>
    chatController.sendMessage(socket, io, chatId, message)
  );
  socket.on("chat:changeMessage", ({ chatId, msgId, message }) =>
    chatController.changeMessage(io, chatId, msgId, message)
  );
  socket.on("chat:deleteMessage", ({ chatId, msgId }) =>
    chatController.deleteMessage(io, chatId, msgId)
  );
  // TODO: use sockets for creating chat and adding participant
  // socket.on("dialogs:createChat", ({ chatName, users }) =>
  //   chatController.createChat(io, chatName, users)
  // );
  // socket.on("dialogs:addParticipant", ({ chatId, userId }) =>
  //   chatController.addParticipant(io, chatId, userId)
  // );
  socket.on("disconnect", () => chatController.disconnectUser(socket));
};
export default ChatRoutes;
