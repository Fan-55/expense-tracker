const express = require('express')
const router = express.Router()

const home = require('./modules/home')
const records = require('./modules/records')

router.use('/', home)
router.use('/records', records)

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