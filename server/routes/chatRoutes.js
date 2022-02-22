const authMiddleWare = require("../middleware/authMiddleware")
const dialogsService = require("../services/dialogsService")

module.exports = (socket, io) => {
    let user = socket.request.user
    io.use((socket, next) => authMiddleWare(socket.request, socket.request.res, next))
    if (user) {
        socket.on('chat:join', async ({chatId}) => {
            await dialogsService.setOnlineStatus(true, user.userId)
            socket.join(chatId)
            let messages = await dialogsService.getChatMessages(chatId)
            io.in(chatId).emit('messages', messages)
        })
        socket.on('chat:sendMessage', async ({chatId, message}) => {
            let messageData = await dialogsService.postMessage(chatId, message, user.userId)
            io.in(chatId).emit('message', {type: 'send-message', data: messageData})
        })
        socket.on('chat:changeMessage', async ({chatId, msgId, message}) => {
            let messageData = await dialogsService.updateMessage(msgId, message, user.userId)
            io.in(chatId).emit('message', {type: 'change-message', data: messageData})
        })
        socket.on('chat:deleteMessage', async ({chatId, msgId}) => {
            await dialogsService.deleteMessage(msgId)
            io.in(chatId).emit('message', {type: 'delete-message', data: msgId})
        })
        socket.on('disconnect', async () => {
            await dialogsService.setOnlineStatus(false, user.userId)
            console.log("User disconnected")
        })
    }
}