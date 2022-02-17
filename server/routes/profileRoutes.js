const express = require('express')
const router = express.Router()
const controller = require('../controllers/profileControllers')
const passport = require("passport");

router.use(passport.authenticate('jwt', {session: false}))
router.put('/username', controller.EditUsername)
router.put('/status', controller.EditStatus)
router.get('/users', controller.GetUsers)
router.get('/:userId', controller.GetProfile)
module.exports = router;