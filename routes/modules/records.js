const express = require('express')
const router = express.Router()

const Record = require('../../models/record')
const Category = require('../../models/category')

//Go to create new record page
router.get('/new', (req, res, next) => {
  Category.find()
    .select('name')
    .lean()
    .then(categoryList => res.render('new', { categoryList }))
    .catch(err => console.log(err))
})

//Create a new record
router.post('/', (req, res, next) => {
  const newRecord = new Record(req.body)
  newRecord.save()
    .then(result => res.redirect('/'))
    .catch(err => console.log(err))
})

//filter by category
router.get('/filter', async (req, res, next) => {
  const getTotalAmount = require('../../utils/getTotalAmount')
  const selectedCategory = req.query.category
  try {
    const records = await Record
      .find({ category: selectedCategory })
      .populate('category', 'name icon')
      .lean()

    const categories = await Category.find().lean()

    const categoryList = categories.map(category => {
      return {
        _id: category._id.toString(),
        name: category.name
      }
    })

    const totalAmount = getTotalAmount(records)

    res.render('index', { records, totalAmount, categoryList, selectedCategory })

  } catch (err) {
    console.log(err)
  }
})

//Go to edit a record page
router.get('/:id/edit', async (req, res, next) => {
  const id = req.params.id
  try {
    const categories = await Category.find()
      .select('name')
      .lean()

    const categoryList = categories.map(category => {
      return {
        _id: category._id.toString(),
        name: category.name
      }
    })

    let record = await Record.findById(id)
      .lean()

    record.category = record.category.toString()

    res.render('edit', { categoryList, record })

  } catch (err) {
    console.log(err)
  }
})

//Update a record
router.put('/:id', (req, res, next) => {
  const id = req.params.id
  Record.findById(id)
    .then(record => {
      Object.assign(record, req.body)
      return record.save()
    })
    .then(() => res.redirect('/'))
    .catch(err => console.log(err))
})

//Delete a record
router.delete('/:id', (req, res, next) => {
  const id = req.params.id
  Record.findById(id)
    .then(record => record.remove())
    .then(() => res.redirect('/'))
    .catch(err => console.log(err))
})

module.exports = router