const Article = require('../models/articles.ts')

const addArticle = (req, res) => {
  const article = new Article(req.body)
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
  res.render('create-article', { title: 'Create a new article' })
}

const deleteArticle = (req, res) => {
  const id: string = req.params.id
  Article.findByIdAndDelete(id)
    .then((result) => {
      res.json({ redirect: '/' })
    })
    .catch((err) => {
      console.log(err)
    })
}

const articleDetails = (req, res) => {
  const id: string = req.params.id
  Article.findById(id)
    .then((result) => {
      res.render('details', { article: result, title: result.title })
    })
    .catch((err) => {
      console.log(err)
    })
}

module.exports = {
  addArticle,
  createArticle,
  articleDetails,
  deleteArticle,
}
