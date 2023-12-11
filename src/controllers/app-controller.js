"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Article = require('../models/articles');
const index = (req, res) => {
    Article.find()
        .sort({ createdAt: -1 })
        .then((result) => {
        res.render('index', { title: 'Home - Latte Journal', articles: result });
    })
        .catch((err) => {
        console.log(err);
    });
};
const about = (req, res) => {
    res.render('about', { title: 'About us' });
};
const notFound = (req, res) => {
    res.status(404).render('404', { title: '404 - Page not found!' });
};
module.exports = {
    index,
    about,
    notFound,
};
//# sourceMappingURL=app-controller.js.map