const User = require('../models/user.ts')
const jwt = require('jsonwebtoken')

const errorHandler = (err) => {
  console.log(err)

  let errors = { email: '', password: '', name: '', other: '' }
  if (err.message.includes('user validation failed')) {
    if (err.errors) {
      Object.values(err.errors).forEach((error: any) => {
        errors[error.properties.path] = error.properties.message
      })
    }
  }

  // Email already exists
  if (
    err.message.includes(
      'duplicate key error collection: node-practice.users index: email_1 dup key:'
    )
  ) {
    errors.email = 'The email submited is already registered'
  } else if (
    err.message.includes(
      'duplicate key error collection: node-practice.users index: name_1 dup key:'
    )
  ) {
    errors.name = 'The name provided is already registered'
  }

  return errors
}

const createToken = (id) => {
  return jwt.sign({ id }, process.env.SECRET_TOKEN, {
    expiresIn: parseInt(process.env.EXPIRATION_TOKEN),
  })
}

const getSignUp = (req, res) => {
  res.render('auth/signup', { title: 'Sign Up', errors: [] })
}

const postSignUp = async (req, res) => {
  const { email, password, name } = req.body

  try {
    const user = await new User({ email, password, name })
    user
      .save()
      .then((result) => {
        const token = createToken(user._id)
        res.cookie('jwt', token, {
          httpOnly: true,
          maxAge: parseInt(process.env.EXPIRATION_TOKEN) * 1000,
        })
        res.status(201).redirect('/')
      })
      .catch((err) => {
        const errors = errorHandler(err)
        //res.status(400).json({ errors })
        res.render('auth/signup', { title: 'Sign Up', errors })
      })
  } catch (err) {
    const errors = errorHandler(err)
    //res.status(400).json({ errors })
    res.render('auth/signup', { title: 'Sign Up', errors })
  }
}

module.exports = {
  getSignUp,
  postSignUp,
}
