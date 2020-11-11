const express = require('express')
const router = express.Router()

const Record = require('../../models/record')
const Category = require('../../models/category')

const getDate = require('../../utils/getDate')

//Go to create new record page
router.get('/new', (req, res, next) => {
  Category.find()
    .select('name')
    .lean()
    .then(categoryList => res.render('new', { categoryList }))
    .catch(err => next(err))
})

//Create a new record
router.post('/', (req, res, next) => {
  const newRecord = Object.assign({}, req.body)
  newRecord.userId = req.user._id
  Record.create(newRecord)
    .then(() => res.redirect('/'))
    .catch(err => {
      console.log(err)
      next(err)
    })
})

//filter by category
router.get('/filter', async (req, res, next) => {
  const getTotalAmount = require('../../utils/getTotalAmount')
  const selectedCategory = req.query.category
  try {
    const categories = await Category.find().lean()
    const categoryList = categories.map(category => {
      return {
        _id: category._id.toString(),
        name: category.name
      }
    })

    const selectedCategoryId = categoryList.find(category => category.name === selectedCategory)._id

    const records = await Record
      .find({ category: selectedCategoryId })
      .populate('category', 'name icon')
      .lean()
    getDate(records)

    const totalAmount = getTotalAmount(records)

    res.render('index', { records, totalAmount, categoryList, selectedCategory })

  } catch (err) {
    next(err)
  }
})

//Go to edit a record page
router.get('/:id/edit', async (req, res, next) => {
  const _id = req.params.id
  const userId = req.user._id
  try {
    const categories = await Category.find().lean()
    const categoryList = categories.map(category => {
      return {
        _id: category._id.toString(),
        name: category.name
      }
    })

    const record = await Record.findOne({ _id, userId }).lean().exec()
    record.category = record.category.toString()
    getDate(record)
    res.render('edit', { categoryList, record })

  } catch (err) {
    next(err)
  }
})

//Update a record
router.put('/:id', (req, res, next) => {
  const _id = req.params.id
  const userId = req.user._id
  Record.findOne({ _id, userId })
    .then(record => {
      Object.assign(record, req.body)
      return record.save()
    })
    .then(() => res.redirect('/'))
    .catch(err => next(err))
})

//Delete a record
router.delete('/:id', (req, res, next) => {
  const _id = req.params.id
  const userId = req.user._id
  Record.findOne({ _id, userId })
    .then(record => record.remove())
    .then(() => res.redirect('/'))
    .catch(err => next(err))
})

module.exports = router