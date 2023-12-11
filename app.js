"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
// Middleware
const mongoose = require('mongoose');
require('dotenv').config();
const cookieParser = require('cookie-parser');
const auth = require('./src/middlewares/auth-middleware');
// Routes
const arRoutes = require('./src/routes/article-routes');
const authRoutes = require('./src/routes/auth-routes');
//Controllers
const appController = require('./src/controllers/app-controller');
// App configs
const app = express();
const port = parseInt(process.env.APP_PORT, 10);
// DB setup
const dbLogin = process.env.DB_LOGIN;
const dbpassword = process.env.DB_PASSWORD;
const dbCollection = process.env.DB_COLLECTION;
const database = process.env.DB_MAIN;
const dbURI = `mongodb+srv://${dbLogin}:${dbpassword}@${database}.xsrxyjs.mongodb.net/${dbCollection}?retryWrites=true&w=majority`;
mongoose
    .connect(dbURI)
    .then((result) => {
    console.log('connection to db established!');
})
    .catch((err) => {
    console.log(err);
});
//  View engine
app.set('view engine', 'ejs');
app.set('views', 'src/views');
app.use(express.static(__dirname + '/src/public'));
//  Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.get('*', auth.getUserLocal);
//  App routes
app.get('/', appController.index);
app.get('/about', appController.about);
// Article routes
app.use('/articles', arRoutes);
// Auth routes
app.use('/auth', authRoutes);
// 404
app.use(appController.notFound);
// App init
app.listen(port);
console.log(`Server running at port ${port}`);
//# sourceMappingURL=app.js.map