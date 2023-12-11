const express = require('express')
const router = express.Router()
const authController = require('../controllers/auth-controller')

router.get('/signup', authController.getSignUp)
router.post('/signup', authController.postSignUp)
router.get('/login', authController.getLogin)
router.post('/login', authController.postLogin)
router.get('/logout', authController.getLogout)

module.exports = router
