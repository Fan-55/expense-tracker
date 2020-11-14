const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const FacebookStrategy = require('passport-facebook').Strategy
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

passport.use(new FacebookStrategy({
  clientID: process.env.FACEBOOK_ID,
  clientSecret: process.env.FACEBOOK_SECRET,
  callbackURL: process.env.FACEBOOK_CALLBACK,
  profileFields: ['email', 'displayName']
}, async (accessToken, refreshToken, profile, done) => {
  try {
    const { name, email } = profile._json
    const user = await User.findOne({ email }).exec()
    if (user) {
      return done(null, user)
    } else {
      const randomPassword = Math.random().toString(36).slice(-8)
      const salt = await bcrypt.genSalt(10)
      const hash = await bcrypt.hash(randomPassword, salt)
      const user = await User.create({ name, email, password: hash })
      return done(null, user)
    }
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