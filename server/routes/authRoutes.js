const express = require('express')
const router = express.Router()
const controller = require('../controllers/authControllers')
const passport = require('passport')
const {check} = require('express-validator')

router.get('/me', controller.AuthUser)
router.post('/login', controller.LoginUser)
router.post('/reg', [
    check('login', 'Login need to be more then 5 and less then 20').notEmpty().isLength({min: 5, max: 20}),
    check('password', 'Password cannot be less then 8 and more then 40').notEmpty().isLength({min: 8, max: 40}),
], controller.RegisterUser)
router.delete('/login', controller.LogoutUser)
router.get('/users', passport.authenticate('jwt', {session: false}), controller.GetUsers)

module.exports = router;