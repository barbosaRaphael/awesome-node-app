const express = require('express')
const router = express.Router()
const authController = require('../controllers/auth-controller.ts')

router.get('/signup', authController.getSignUp)
router.post('/signup', authController.postSignUp)
router.get('/login', () => {})
router.post('/login', () => {})

module.exports = router
