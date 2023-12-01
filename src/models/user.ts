const mongoose = require('mongoose')
const Schema = mongoose.Schema
const validator = require('validator')

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, 'Please provide an email'],
      unique: true,
      validate: [
        (val) => validator.isEmail(val),
        'The email provided is invalid',
      ],
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minLength: [8, 'The password must have at least 8 characters in length'],
    },
    name: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
)

const User = mongoose.model('user', userSchema)

module.exports = User
