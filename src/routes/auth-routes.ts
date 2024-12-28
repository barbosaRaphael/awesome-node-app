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
import environmentCheck from '../middlewares/environment-check'

router.get('/signup', getSignUp)
router.post('/signup', attachUserLocal, environmentCheck, postSignUp)
router.get('/login', getLogin)
router.post('/login', attachUserLocal, environmentCheck, postLogin)
router.get('/logout', getLogout)

export default router
