const express = require('express')
const router = express.Router()

const Record = require('../../models/record')
const Category = require('../../models/category')

router.get('/new', (req, res, next) => {
  Category.find()
    .select('name')
    .lean()
    .then(categories => {
      const categoryList = categories.map(category => {
        return {
          name: category.name,
          id: category._id
        }
      })
      res.render('new', { categoryList })
    })
})

router.post('/', (req, res, next) => {
  const { name, date, category, amount } = req.body
  const newRecord = new Record({
    name, date, category, amount
  })
  newRecord.save()
    .then(result => {
      res.redirect('/')
    })
})

module.exports = router