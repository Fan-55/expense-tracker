const express = require('express')
const router = express.Router()

const Record = require('../../models/record')
const Category = require('../../models/category')


//Read all the records
router.get('/', async (req, res, next) => {
  const getTotalAmount = require('../../utils/getTotalAmount')
  const getDate = require('../../utils/getDate')
  const userId = req.user._id
  try {
    const records = await Record.find({ userId }).populate('category', 'name icon').lean().exec()
    getDate(records)
    const categoryList = await Category.find().lean().exec()
    const totalAmount = getTotalAmount(records)

    res.render('index', { records, totalAmount, categoryList })
  }
  catch (err) {
    next(err)
  }
})

module.exports = router