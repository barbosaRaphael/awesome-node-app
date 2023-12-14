import express from 'express'
const router = express.Router()
const authController = require('../controllers/auth-controller')
const { attachUserLocal } = require('../middlewares/auth-middleware')

router.get('/signup', authController.getSignUp)
router.post('/signup', attachUserLocal, authController.postSignUp)
router.get('/login', authController.getLogin)
router.post('/login', attachUserLocal, authController.postLogin)
router.get('/logout', authController.getLogout)

module.exports = router
