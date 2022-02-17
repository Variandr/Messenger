const express = require('express')
const router = express.Router()
const controller = require('../controllers/dialogsControllers')
const passport = require("passport");

router.use(passport.authenticate('jwt', {session: false}))
router.get('/:userId', controller.GetDialogs)
router.get('/chat/:chatId', controller.GetChatData)
router.post('/', controller.CreateChat)
router.post('/:chatId', controller.PostMessage)
router.put('/message/:msgId', controller.UpdateMessage)
router.put('/:chatId', controller.AddParticipant)
router.delete('/chat/message/:msgId', controller.DeleteMessage)
module.exports = router;