const dialogsService = require("../services/dialogsService");
module.exports.Connect = async (socket) => {
    await dialogsService.setOnlineStatus(true, socket.request.user?.userId)
    socket.join(socket.chatId)
}
module.exports.Disconnect = async (socket) => {
    await dialogsService.setOnlineStatus(false, socket.request.user?.userId)
    console.log("User disconnected")
}