const authMiddleWare = require("../middleware/authMiddleware")
const dialogsService = require("../services/dialogsService")

module.exports = (socket, io) => {
    let user = socket.request.user
    io.use((socket, next) => authMiddleWare(socket.request, socket.request.res, next))
    if (user) {
        socket.on('dialogs:join', async () => {
            socket.join(user.userId)
            let data = await dialogsService.getDialogs(user.userId)
            io.in(user.userId).emit('dialogs', data)
        })
        socket.on('chat:join', async ({chatId}) => {
            await dialogsService.setOnlineStatus(true, user.userId)
            socket.join(chatId)
            let messages = await dialogsService.getChatMessages(chatId)
            let chatData = await dialogsService.getChatInfo(chatId)
            let chatUsers = await dialogsService.getChatUsers(chatData.id)
            io.in(chatId).emit('chatData', {...chatData, messages: messages, chatMembers: chatUsers})
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
            let messageData = await dialogsService.deleteMessage(msgId)
            io.in(chatId).emit('message', {type: 'delete-message', data: messageData})
        })
        socket.on('disconnect', async () => {
            await dialogsService.setOnlineStatus(false, user.userId)
            console.log("User disconnected")
        })
    }
}