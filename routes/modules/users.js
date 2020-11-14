const express = require('express')
const router = express.Router()
const passport = require('passport')
const User = require('../../models/user')
const bcrypt = require('bcryptjs')

router.get('/login', (req, res, next) => {
  res.render('login')
})

router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/users/login',
  failureFlash: true
}))

router.get('/register', (req, res, next) => {
  res.render('register')
})

router.post('/register', async (req, res, next) => {
  const { name, email, password, confirmPassword } = req.body
  const { getRegisterErrors } = require('../../utils/functions')

  const errors = getRegisterErrors(name, email, password, confirmPassword)

  try {
    const user = await User.findOne({ email })
    if (user) {
      errors.userExist = '此Email已被註冊。'
    }

    if (Object.keys(errors).length) {
      res.render('register', { name, email, password, confirmPassword, errors })
    } else {
      const salt = await bcrypt.genSalt(10)
      const hash = await bcrypt.hash(password, salt)
      await User.create({ name, email, password: hash })
      req.flash('success_msg', '註冊成功，請登入。')
      res.redirect('/users/login')
    }
  } catch (err) {
    console.log(err)
    next(err)
  }
})

router.get('/logout', (req, res, next) => {
  req.logout()
  req.flash('success_msg', '已成功登出。')
  res.redirect('/users/login')
})

module.exports = router