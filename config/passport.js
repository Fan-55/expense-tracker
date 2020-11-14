const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const User = require('../models/user')
const bcrypt = require('bcryptjs')

passport.use(new LocalStrategy({ usernameField: 'email' }, async (email, password, done) => {
  try {
    const user = await User.findOne({ email }).exec()
    if (!user) return done(null, false, { message: 'Email或密碼錯誤。' })
    const isMatch = await bcrypt.compare(password, user.password)
    return isMatch ? done(null, user) : done(null, false, { message: 'Email或密碼錯誤。' })
  } catch (err) {
    console.log(err)
    return done(err)
  }
}))

passport.serializeUser((user, done) => {
  done(null, user.id)
})

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id).lean().exec()
    done(null, user)
  } catch (err) {
    done(err)
  }
})