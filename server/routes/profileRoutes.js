const express = require('express')
const router = express.Router()
const controller = require('../controllers/profileControllers')
const authMiddleware = require('../middleware/authMiddleware')

router.put('/username', authMiddleware, controller.EditUsername)
router.put('/avatar', authMiddleware, controller.EditImage)
router.put('/status', authMiddleware, controller.EditStatus)
router.get('/users', controller.GetUsers)
router.get('/:userId', controller.GetProfile)
module.exports = router;