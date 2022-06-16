import { Application } from "express";
import authRouter from "./api/auth.route";
import profileRoutes from "./api/profile.route";
import dialogsRoutes from "./api/dialogs.route";
import { Server, Socket } from "socket.io";
import chatRoutes from "./api/chat.route";

class AppRouter {
  constructor(private app: Application) {}

  init(io: Server) {
    this.app.get("/", (_req, res) => {
      res.send("API Running");
    });
    this.app.use("/api/auth", authRouter);
    this.app.use("/api/profile", profileRoutes);
    this.app.use("/api/dialogs", dialogsRoutes);
    io.on("connection", (socket: Socket) => chatRoutes(socket, io));
  }
}

export default AppRouter;
