const express = require('express')
const router = express.Router()

const Record = require('../../models/record')
const Category = require('../../models/category')

const { getTotalAmount, formatDate, getCategoryList, getLocalDate } = require('../../utils/functions')

//get "create a new record" page
router.get('/new', async (req, res, next) => {
  try {
    const date = getLocalDate()
    const categoryList = await getCategoryList(Category)
    res.render('new', { categoryList, date })
  } catch (err) {
    console.log(err)
    next(err)
  }
})

//Create a new record
router.post('/', async (req, res, next) => {
  console.log(req.body)
  const { name, merchant, date, category, amount } = req.body

  const errors = {}
  if (!name) {
    errors.name = '名稱為必填欄位。'
  }
  if (!date) {
    errors.date = '日期為必填欄位。'
  }
  if (!category) {
    errors.category = '種類為必填欄位。'
  }
  if (!amount) {
    errors.amount = '金額為必填欄位。'
  }

  //if error exists, go back to edit page with error message; else save the updated data and go back to index page
  if (Object.keys(errors).length) {
    const categoryList = await getCategoryList(Category)
    res.render('new', { errors, name, merchant, date, category, amount, categoryList })
  } else {
    const newRecord = Object.assign({}, req.body)
    newRecord.userId = req.user._id
    try {
      await Record.create(newRecord)
      res.redirect('/')
    } catch (err) {
      console.log(err)
      next(err)
    }
  }
})

//Go to edit a record page
router.get('/:id/edit', getCategoryList, async (req, res, next) => {
  const _id = req.params.id
  const userId = req.user._id
  try {
    const categoryList = res.locals.categoryList
    const record = await Record.findOne({ _id, userId }).lean().exec()
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

//filter by category or month
router.get('/', getCategoryList, async (req, res, next) => {
  const getTotalAmount = require('../../utils/getTotalAmount')

  const [filter, option] = Object.entries(req.query)[0]

  if (filter === 'month') {
    const getDateRange = require('../../utils/getDateRange')
    const dateRange = getDateRange(option)
    console.log(dateRange)
    try {
      const records = await Record.find({ date: dateRange }).populate('category', 'name icon').lean()
      getDate(records)
      const totalAmount = getTotalAmount(records)
      res.render('index', { records, totalAmount, option })
    } catch (err) {
      console.log(err)
      next(err)
    }
  }

  if (filter === 'category') {
    const selectedCategory = req.query.category
    const categoryList = res.locals.categoryList
    try {
      const selectedCategoryId = categoryList.find(category => category.name === selectedCategory)._id
      const records = await Record.find({ category: selectedCategoryId }).populate('category', 'name icon').lean()
      getDate(records)
      const totalAmount = getTotalAmount(records)
      res.render('index', { records, totalAmount, selectedCategory })
    } catch (err) {
      next(err)
    }
  }
})
module.exports = router