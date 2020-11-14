const express = require('express')
const router = express.Router()

const home = require('./modules/home')
const records = require('./modules/records')
const users = require('./modules/users')
const auth = require('./modules/auth')

const authenticator = require('../middleware/authenticator')

router.use('/users', users)
router.use('/auth', auth)
router.use('/records', authenticator, records)
router.use('/', authenticator, home)

//errors handling
router.use((req, res, next) => {
  const err = new Error('Not found')
  err.status = 404
  next(err)
})

router.use((err, req, res, next) => {
  if (err.status !== 404) {
    err.status = 500
  }
  console.log(err)
  res.status(err.status || 500)
  res.render('error', { err })
})


module.exports = router