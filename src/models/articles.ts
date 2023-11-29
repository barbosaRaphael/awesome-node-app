const mongoose = require('mongoose')
const Schema = mongoose.Schema

const articleSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    snippet: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
)

const article = mongoose.model('articles', articleSchema)

module.exports = article
