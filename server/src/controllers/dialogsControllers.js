const dialogsService = require("../services/dialogsService");

module.exports.CreateChat = async (req, res, next) => {
  try {
    const { chatName, users } = req.body;
    let data = await dialogsService.createChat(chatName, users);
    return res.json(data);
  } catch (e) {
    next(e);
  }
};

module.exports.AddParticipant = async (req, res, next) => {
  try {
    const { userId } = req.body;
    let data = await dialogsService.addParticipant(req.params.chatId, userId);
    return res.json(data);
  } catch (e) {
    next(e);
  }
};
