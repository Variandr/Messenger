const dialogsService = require("../services/dialogsService");

module.exports.GetDialogs = async (req, res, next) => {
    try {
        let data = await dialogsService.getDialogs(req.user.userId)
        return res.json(data)
    } catch (e) {
        next(e)
    }
}

module.exports.GetChatData = async (req, res, next) => {
    try {
        let chatData = await dialogsService.getChatInfo(req.params.chatId)
        let chatUsers = await dialogsService.getChatUsers(chatData.id)
        return res.status(200).json({...chatData, chatMembers: chatUsers})
    } catch (e) {
        next(e)
    }
}

module.exports.CreateChat = async (req, res, next) => {
    try {
        const {chatName, users} = req.body
        let data = await dialogsService.createChat(chatName, users)
        return res.json(data)
    } catch (e) {
        next(e)
    }
}

module.exports.AddParticipant = async (req, res, next) => {
    try {
        const {userId} = req.body
        let data = await dialogsService.addParticipant(req.params.chatId, userId)
        return res.json(data)
    } catch (e) {
        next(e)
    }
}

module