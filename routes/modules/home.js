const express = require('express')
const router = express.Router()

const Record = require('../../models/record')
const Category = require('../../models/category')

router.get('/', (req, res, next) => {
  Record.find()
    .populate('category', 'name icon -_id')
    .lean()
    .then(records => res.render('index', { records }))
    .catch(err => console.log(err))
})

module.exports = router