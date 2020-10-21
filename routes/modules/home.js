const express = require('express')
const router = express.Router()

const Record = require('../../models/record')
const Category = require('../../models/category')

//Read all the records
router.get('/', async (req, res, next) => {
  const getTotalAmount = require('../../utils/getTotalAmount')
  try {
    const records = await Record.find()
      .populate('category', 'name icon')
      .lean()

    const categoryList = await Category.find().lean()

    const totalAmount = getTotalAmount(records)

    res.render('index', { records, totalAmount, categoryList })

  }
  catch (err) { console.log(err) }
})

module.exports = router