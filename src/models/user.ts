import mongoose from 'mongoose'
const Schema = mongoose.Schema
const validator = require('validator')
const bcrypt = require('bcrypt')

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
      minlength: [8, 'The password must have at least 8 characters in length'],
    },
    name: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
)

// Hashing hook
userSchema.pre('save', async function (next) {
  const salt = await bcrypt.genSalt()
  this.password = await bcrypt.hash(this.password, salt)
  next()
})

//  Login static
userSchema.statics.login = async function (email, password) {
  // searh for the email on db
  const user = await this.findOne({ email })
  if (user) {
    // Validate password
    const auth = await bcrypt.compare(password, user.password)
    if (auth) {
      return user
    }
    throw Error('Incorrect Password!')
  }
  throw Error("The email provided is incorrect or isn't registered")
}

const User = mongoose.model('user', userSchema)

module.exports = User
