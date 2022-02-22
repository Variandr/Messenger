const dialogsService = require("../services/dialogsService");
module.exports.Connect = async (socket, data) => {
    await dialogsService.setOnlineStatus(true, socket.request.user?.userId)
    console.log(data.chatId)
    socket.join(socket.chatId)
}
module.exports.Disconnect = async (socket) => {
    await dialogsService.setOnlineStatus(false, socket.request.user?.userId)
    console.log("User disconnected")
}