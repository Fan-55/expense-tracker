const express = require('express')
const router = express.Router()

const Record = require('../../models/record')
const Category = require('../../models/category')
const getTotalAmount = require('../../utils/getTotalAmount')

router.get('/', (req, res, next) => {
  Record.find()
    .populate('category', 'name icon -_id')
    .lean()
    .then(records => {
      const totalAmount = getTotalAmount(records)
      res.render('index', { records, totalAmount })
    })
    .catch(err => console.log(err))
})

module.exports = router