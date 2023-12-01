const express = require('express')
require('dotenv').config()
const mongoose = require('mongoose')
const arRoutes = require('./src/routes/article-routes.ts')
const authRoutes = require('./src/routes/auth-routes.ts')
const appController = require('./src/controllers/app-controller.ts')

// App configs
const app = express()
const port: Number = parseInt(process.env.APP_PORT, 10)

// DB setup
const dbLogin: string = process.env.DB_LOGIN
const dbpassword: string = process.env.DB_PASSWORD
const dbCollection: string = process.env.DB_COLLECTION
const database: string = process.env.DB_MAIN
const dbURI: string = `mongodb+srv://${dbLogin}:${dbpassword}@${database}.xsrxyjs.mongodb.net/${dbCollection}?retryWrites=true&w=majority`

mongoose
  .connect(dbURI)
  .then((result) => {
    console.log('connection to db established!')
  })
  .catch((err) => {
    console.log(err)
  })

//View engine
app.set('view engine', 'ejs')
app.set('views', 'src/views')

app.use(express.static(__dirname + '/src/public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

//  App routes
app.get('/', appController.index)
app.get('/about', appController.about)

// Article routes
app.use('/articles', arRoutes)

// Auth routes
app.use('/auth', authRoutes)

// 404
app.use(appController.notFound)

// App init
app.listen(port)
console.log(`Server running at port ${port}`)
