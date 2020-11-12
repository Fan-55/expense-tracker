const express = require('express')
const router = express.Router()

const Record = require('../../models/record')
const getCategoryList = require('../../middleware/getCategoryList')


//Read all the records
router.get('/', getCategoryList, async (req, res, next) => {
  const getTotalAmount = require('../../utils/getTotalAmount')
  const getDate = require('../../utils/getDate')
  const userId = req.user._id
  try {
    const records = await Record.find({ userId }).populate('category', 'name icon').lean().exec()
    getDate(records)
    const totalAmount = getTotalAmount(records)
    res.render('index', { records, totalAmount })
  }
  catch (err) {
    next(err)
  }
})

module.exports = router