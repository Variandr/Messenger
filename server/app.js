const express = require("express");
const cors = require("cors");
const port = process.env.PORT || 5000;
const app = express();
const authRoutes = require("./routes/authRoutes");
const profileRoutes = require("./routes/profileRoutes");
const dialogsRoutes = require("./routes/dialogsRoutes");
const cookieParser = require("cookie-parser");
const errorMiddleware = require("./middleware/errorMiddleware");
const server = require("http").createServer(app);
const chatRoutes = require("./routes/chatRoutes");
const io = require("socket.io")(server, {
  cors: {
    origin: "http://localhost:3000",
    credentials: true,
  },
});

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000",
  })
);
app.use(require("morgan")("dev"));
app.use("/api/auth", authRoutes);
app.use("/api/profile", profileRoutes);

io.on("connection", (socket) => {
  console.log("User connected", socket.id);
  chatRoutes(socket, io);
});
app.use("/api/dialogs", dialogsRoutes);

app.use(errorMiddleware);
server.listen(port, () => console.log(`Server running on port ${port}!`));