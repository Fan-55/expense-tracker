const express = require('express')
const router = express.Router()

const Record = require('../../models/record')
const Category = require('../../models/category')

const { getTotalAmount, formatDate, getCategoryList } = require('../../utils/functions')

//Read all the records
router.get('/', async (req, res, next) => {
  try {
    const userId = req.user._id
    const records = await Record.find({ userId }).populate('category', 'name icon').lean().exec()
    formatDate(records)
    const totalAmount = getTotalAmount(records)
    const categoryList = await getCategoryList(Category)
    res.render('index', { records, totalAmount, categoryList })
  }
  catch (err) {
    next(err)
  }
})

module.exports = router