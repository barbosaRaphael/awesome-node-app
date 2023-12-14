import express from 'express'
const router = express.Router()
const articleController = require('../controllers/article-controller')
const {
  isAuth,
  attachCurrentUser,
  attachUserLocal,
} = require('../middlewares/auth-middleware')

router.post('/add-article', attachCurrentUser, articleController.addArticle)

router.get('/create-article', isAuth, articleController.createArticle)

router.get('/:id', articleController.articleDetails)

router.delete(
  '/:id',
  isAuth,
  attachCurrentUser,
  articleController.deleteArticle
)

module.exports = router
