const express = require('express')
const router = express.Router()

const Record = require('../../models/record')
const Category = require('../../models/category')

const { getTotalAmount, formatDate, getCategoryList, getLocalDate, getDateRange } = require('../../utils/functions')

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
router.get('/:id/edit', async (req, res, next) => {
  try {
    const _id = req.params.id
    const userId = req.user._id
    const categoryList = await getCategoryList(Category)
    const record = await Record.findOne({ _id, userId }).lean().exec()
    formatDate(record)
    res.render('edit', { categoryList, record })
  } catch (err) {
    console.log(err)
    next(err)
  }
})

//Update a record
router.put('/:id', async (req, res, next) => {
  try {
    const _id = req.params.id
    const userId = req.user._id
    const originalRecord = await Record.findOne({ _id, userId }).exec()
    Object.assign(originalRecord, req.body)
    await originalRecord.save()
    res.redirect('/')
  } catch (err) {
    console.log(err)
    next(err)
  }
})

//Delete a record
router.delete('/:id', async (req, res, next) => {
  try {
    const _id = req.params.id
    const userId = req.user._id
    const record = await Record.findOne({ _id, userId })
    await record.remove()
    res.redirect('/')
  } catch (err) {
    console.log(err)
    next(err)
  }
})

//filter by category or month
router.get('/', async (req, res, next) => {
  const [filter, option] = Object.entries(req.query)[0]

  if (filter === 'month') {
    try {
      const dateRange = getDateRange(option)
      const records = await Record.find({ date: dateRange }).populate('category', 'name icon').lean()
      formatDate(records)
      const totalAmount = getTotalAmount(records)
      const categoryList = await getCategoryList(Category)
      res.render('index', { records, totalAmount, option, categoryList })
    } catch (err) {
      console.log(err)
      next(err)
    }
  }

  if (filter === 'category') {
    try {
      const selectedCategory = req.query.category
      const categoryList = await getCategoryList(Category)
      const selectedCategoryId = categoryList.find(category => category.name === selectedCategory)._id
      const records = await Record.find({ category: selectedCategoryId }).populate('category', 'name icon').lean()
      formatDate(records)
      const totalAmount = getTotalAmount(records)
      res.render('index', { records, totalAmount, selectedCategory, categoryList })
    } catch (err) {
      console.log(err)
      next(err)
    }
  }
})
module.exports = router