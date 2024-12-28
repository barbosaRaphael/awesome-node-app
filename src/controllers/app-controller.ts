import Article from '../models/article'

const heroImgRenders = [
  "https://images.unsplash.com/photo-1600093463592-8e36ae95ef56?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1514542397203-89768ef90e20?q=80&w=1742&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1526732779586-14c73df166b1?q=80&w=1514&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1439242088854-0c76045f4124?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1510083300914-5ffac797d9d2?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1521168277767-fe733d1f7689?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
]

function getRandomImg() {
  return Math.floor(Math.random() * heroImgRenders.length);
}

const index = (req, res) => {
  Article.find()
    .sort({ createdAt: -1 })
    .then((result) => {
      res
        .status(200)
        .render('index', { title: 'Home - Coffe Perk', articles: result, hero: heroImgRenders[getRandomImg()] })
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
