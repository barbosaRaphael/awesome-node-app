const User = require('../models/user.ts')

const errorHandler = (err) => {
  console.log(err.message, err.code)
}

const getSignUp = (req, res) => {
  res.render('auth/signup', { title: 'Sign Up' })
}

const postSignUp = async (req, res) => {
  const { email, password, name } = req.body

  try {
    const user = await new User({ email, password, name })
    user
      .save()
      .then((result) => {
        res.status(201).send(`User '${name}' signed up`)
      })
      .catch((err) => {
        console.log(err)
        res.status(400).send('Error, user not created')
      })
  } catch (err) {
    console.log(err)
    res.status(400).send('Error, user not created')
  }
}

module.exports = {
  getSignUp,
  postSignUp,
}
