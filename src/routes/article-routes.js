"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
const router = express.Router();
const articleController = require('../controllers/article-controller');
const { isAuth } = require('../middlewares/auth-middleware');
router.post('/add-article', articleController.addArticle);
router.get('/create-article', isAuth, articleController.createArticle);
router.get('/:id', articleController.articleDetails);
router.delete('/:id', articleController.deleteArticle);
module.exports = router;
//# sourceMappingURL=article-routes.js.map