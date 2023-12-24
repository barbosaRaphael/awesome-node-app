import Article from '../models/article'

const index = (req, res) => {
  Article.find()
    .sort({ createdAt: -1 })
    .then((result) => {
      res
        .status(200)
        .render('index', { title: 'Home - Latte Journal', articles: result })
    })
    .catch((err) => {
      console.log(err)
    })
}

const about = (req, res) => {
  res.status(200).render('about', { title: 'About us' })
}

const notFound = (req, res) => {
  res.status(404).render('404', { title: '404 - Page not found!' })
}

export default {
  index,
  about,
  notFound,
}
