import express from 'express'
const router = express.Router()
import {
    getSignUp,
    postSignUp,
    getLogin,
    postLogin,
    getLogout,
  } from '../controllers/auth-controller'
import {attachUserLocal} from '../middlewares/auth-middleware'

router.get('/signup', getSignUp)
router.post('/signup', attachUserLocal, postSignUp)
router.get('/login', getLogin)
router.post('/login', attachUserLocal, postLogin)
router.get('/logout', getLogout)

export default router
