const User = require('../models/user.ts')
const jwt = require('jsonwebtoken')

const errorHandler = (err) => {
  console.log(Object.values(err.errors))

  let errors = { email: '', password: '' }
  if (err.message.includes('user validation failed')) {
    Object.values(err.errors).forEach((error: any) => {
      errors[error.properties.path] = error.properties.message
    })
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
