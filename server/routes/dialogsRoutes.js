const express = require('express')
const router = express.Router()
const controller = require('../controllers/dialogsControllers')
const authMiddleware = require('../middleware/authMiddleware')

router.use(authMiddleware)
router.get('/', controller.GetDialogs)
router.get('/chat/:chatId', controller.GetChatData)
router.post('/', controller.CreateChat)
router.post('/:chatId', controller.PostMessage)
router.put('/message/:msgId', controller.UpdateMessage)
router.put('/:chatId', controller.AddParticipant)
router.delete('/message/:msgId', controller.DeleteMessage)
module.exports = router;