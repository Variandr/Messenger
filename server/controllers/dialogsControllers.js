const dialogsService = require("../services/dialogsService");

module.exports.GetDialogs = async (req, res, next) => {
    try {
        let data = await dialogsService.getDialogs(req.params.userId)
        return res.json(data)
    } catch (e) {
        next(e)
    }
}

module.exports.GetChatData = async (req, res, next) => {
    try {
        let data = await dialogsService.getChat(req.params.chatId)
        return res.json(data)
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

module.exports.PostMessage = async (req, res, next) => {
    try {
        let {message, userId} = req.body
        let data = await dialogsService.postMessage(req.params.chatId, message, userId)
        return res.json(data)
    } catch (e) {
        next(e)
    }
}

module.exports.UpdateMessage = async (req, res, next) => {
    try {
        let {message, userId} = req.body
        let data = await dialogsService.updateMessage(req.params.msgId, message, userId)
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

module.exports.DeleteMessage = async (req, res, next) => {
    try {
        let data = await dialogsService.deleteMessage(req.params.msgId)
        return res.json(data)
    } catch (e) {
        next(e)
    }
}