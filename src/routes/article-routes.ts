const express = require('express')
const router = express.Router()
const articleController = require('../controllers/article-controller.ts')

router.post('/add-article', articleController.addArticle)

router.get('/create-article', articleController.createArticle)

router.get('/:id', articleController.articleDetails)

router.delete('/:id', articleController.deleteArticle)

module.exports = router
