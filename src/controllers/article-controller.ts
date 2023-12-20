/* const Article = require('../models/articles') */
import Article from '../models/articles'

const addArticle = async (req, res) => {
  const articleContent = await {
    author: req.user.name,
    title: req.body.title,
    snippet: req.body.snippet,
    body: req.body.body,
  }

  const article = await new Article(articleContent)
  article
    .save()
    .then((result) => {
      res.redirect('/')
    })
    .catch((err) => {
      console.log(err)
    })
}

const createArticle = (req, res) => {
  res.render('/article/create-article', { title: 'Create a new article' })
}

const deleteArticle = (req, res) => {
  const id: string = req.params.id

  const name = req.user.name
  Article.findById(id)
    .then((article) => {
      console.log(article.author, name)
      if (article.author === name) {
        Article.findByIdAndDelete(id)
          .then((result) => {
            res.json({ redirect: '/' })
          })
          .catch((err) => {
            console.log(err)
          })
      } else {
        throw Error('Not authorized')
      }
    })
    .catch((err) => {
      console.log(err)
    })
}

const articleDetails = (req, res) => {
  const id: string = req.params.id
  Article.findById(id)
    .then((result) => {
      res.render('article/details', { article: result, title: result.title })
    })
    .catch((err) => {
      console.log(err)
    })
}

export {
  addArticle,
  createArticle,
  articleDetails,
  deleteArticle,
}