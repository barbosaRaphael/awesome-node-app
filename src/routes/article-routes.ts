const express = require('express')
const router = express.Router()
const articleController = require('../controllers/article-controller.ts')
const { isAuth } = require('../middlewares/auth-middleware')

router.post('/add-article', articleController.addArticle)

router.get('/create-article', isAuth, articleController.createArticle)

router.get('/:id', articleController.articleDetails)

router.delete('/:id', articleController.deleteArticle)

module.exports = router
