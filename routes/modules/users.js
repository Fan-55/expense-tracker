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
  failureRedirect: '/users/login'
}))

router.get('/register', (req, res, next) => {
  res.render('register')
})

router.post('/register', async (req, res, next) => {
  const { name, email, password, confirmPassword } = req.body
  const errors = {}
  if (!name.trim()) {
    errors.name = '姓名欄位不能空白。'
  }
  if (!email.trim()) {
    errors.email = 'Email欄位不能空白。'
  }
  if (!password) {
    errors.password = '密碼欄位不能空白。'
  }

  if (password !== confirmPassword) {
    errors.diffPassword = '密碼與確認密碼不相符。'
  }

  try {
    const user = await User.findOne({ email })
    if (user) {
      errors.userExist = '此Email已被註冊。'
    }

    if (Object.keys(errors).length) {
      console.log(errors)
      res.render('register', { name, email, password, confirmPassword, errors })
    } else {
      const salt = await bcrypt.genSalt(10)
      const hash = await bcrypt.hash(password, salt)
      await User.create({ name, email, password: hash })
      res.redirect('/')
    }
  } catch (err) {
    console.log(err)
    next(err)
  }
})

module.exports = router