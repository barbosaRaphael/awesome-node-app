import User from '../models/user'
import jwt from 'jsonwebtoken'

const errorHandler = (err) => {
  console.log(err)

  let errors = { email: '', password: '', name: '', other: '' }

  //  Sign up validation erros
  if (err.message.includes('user validation failed')) {
    if (err.errors) {
      Object.values(err.errors).forEach((error: any) => {
        errors[error.properties.path] = error.properties.message
      })
    }
  }

  // Sign up duplicate cases
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

  // Login Errors
  if (
    err.message.includes("The email provided is incorrect or isn't registered")
  ) {
    errors.email = err.message
  }
  if (err.message.includes('Incorrect Password!')) {
    errors.password = err.message
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
        res.render('auth/signup', { title: 'Sign Up', errors })
      })
  } catch (err) {
    const errors = errorHandler(err)
    res.render('auth/signup', { title: 'Sign Up', errors })
  }
}

const getLogin = (req, res) => {
  res.render('auth/login', { title: 'Log in', errors: [] })
}

const postLogin = async (req, res) => {
  const { email, password } = req.body
  try {
    const user = await User.login(email, password)
    if (user) {
      const token = createToken(user._id)
      res.cookie('jwt', token, {
        httpOnly: true,
        maxAge: parseInt(process.env.EXPIRATION_TOKEN) * 1000,
      })
      res.status(201).redirect('/')
    }
  } catch (err) {
    const errors = errorHandler(err)
    res.render('auth/login', { title: 'Log in', errors })
  }
}

const getLogout = async (req, res) => {
  res.cookie('jwt', '', { maxAge: 1 })
  res.redirect('/')
}

export {
  getSignUp,
  postSignUp,
  getLogin,
  postLogin,
  getLogout,
}
