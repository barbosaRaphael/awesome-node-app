import {Model, Schema, model} from 'mongoose'
//const Schema = mongoose.Schema

import validator from 'validator'
import bcrypt from 'bcrypt'

interface IUser {
  email: string,
  password: string,
  name: string
}

interface IUserMethods extends Model<IUser> {
  login(login: string, password: string): any;
  }

//type UserModel = Model<IUser, {}, IUserMethods>;

const userSchema = new Schema<IUser, IUserMethods>(
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
userSchema.static('login', async function (email, password) {
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
})

const User = model<IUser, IUserMethods>('user', userSchema)
export default User
