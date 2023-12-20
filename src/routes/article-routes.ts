import express from 'express'
const router = express.Router()
import {
  addArticle,
  createArticle,
  articleDetails,
  deleteArticle,
} from '../controllers/article-controller'
import {attachCurrentUser, isAuth} from '../middlewares/auth-middleware'

router.post('/add-article', attachCurrentUser, addArticle)

router.get('/create-article', isAuth, createArticle)

router.get('/:id', articleDetails)

router.delete(
  '/:id',
  isAuth,
  attachCurrentUser,
  deleteArticle
)

export default router
