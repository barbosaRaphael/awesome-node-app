import express from 'express'
import path from 'path'

// Middleware
import favicon from 'serve-favicon'
const mongoose = require('mongoose')
require('dotenv').config()
import cookieParser from 'cookie-parser'
import {attachUserLocal} from './src/middlewares/auth-middleware'
import environmentCheck from './src/middlewares/environment-check'

// Routes
import arRoutes from './src/routes/article-routes'
import authRoutes from './src/routes/auth-routes'

//Controllers
import appController from './src/controllers/app-controller'

// App configs
const app = express()

// DB setup
const dbLogin: string = process.env.DB_LOGIN
const dbpassword: string = process.env.DB_PASSWORD
const dbCollection: string = process.env.DB_COLLECTION
const database: string = process.env.DB_MAIN
const urikey: string = process.env.URI_DB_ACCESS_KEY
const dbURI: string = `mongodb+srv://${dbLogin}:${dbpassword}@${database}.${urikey}.mongodb.net/${dbCollection}?retryWrites=true&w=majority`

mongoose
  .connect(dbURI)
  .then((result) => {
    console.log('connection to db established!')
  })
  .catch((err) => {
    console.log(err)
  })

//  View engine
app.set('view engine', 'ejs')
app.set('views', 'src/views')

app.use(favicon(path.join(__dirname, '/', '/favicon.ico')))
app.use(express.static(__dirname + '/src/public'))

//  Middleware
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cookieParser())
app.get('*', attachUserLocal, environmentCheck)

//  Routes
app.get('/', appController.index)
app.get('/about', appController.about)
app.use('/article', arRoutes)
app.use('/auth', authRoutes)

// 404
app.use(appController.notFound)

export default app