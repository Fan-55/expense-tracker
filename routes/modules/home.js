const express = require('express')
const router = express.Router()

const Record = require('../../models/record')
const Category = require('../../models/category')

router.get('/', (req, res, next) => {
  const getDate = require('../../utils/getDate')
  Record.find()
    .select('name date category amount')
    .populate('category', 'name icon -_id')
    .lean()
    .then(results => {
      const records = results.map(record => {
        const date = getDate(record.date)
        return {
          id: record._id,
          name: record.name,
          category: record.category.name,
          icon: record.category.icon,
          date: date,
          amount: record.amount
        }
      })
      res.render('index', { records })
    })
})

module.exports = router