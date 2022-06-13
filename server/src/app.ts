import express from "express";
import cors from "cors";
import { Server, Socket } from "socket.io";
import { createServer } from "http";
import cookieParser from "cookie-parser";
import errorMiddleware from "./middleware/error.middleware";
import chatRoutes from "./routes/api/chatRoutes";
import AppRouter from "./routes";

const app = express();
const server = createServer(app);
const router = new AppRouter(app);

const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        credentials: true,
    },
});

app.set("port", process.env.PORT || 5000);
app.use(express.json());
app.use(cookieParser());

app.use(
    cors({
        credentials: true,
        origin: "http://localhost:3000",
    })
);

router.init();

io.on("connection", (socket: Socket) => {
    // tslint:disable-next-line:no-console
    console.log("User connected", socket.id);
    chatRoutes(socket, io);
});

app.use(errorMiddleware);

const port = app.get("port");
// tslint:disable-next-line:no-console
server.listen(port, () => console.log(`Server running on port ${port}!`));