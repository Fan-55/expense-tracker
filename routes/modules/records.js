const express = require('express')
const router = express.Router()

const Record = require('../../models/record')
const Category = require('../../models/category')

router.get('/new', (req, res, next) => {
  Category.find()
    .select('name')
    .lean()
    .then(categoryList => res.render('new', { categoryList }))
    .catch(err => console.log(err))
})

router.post('/', (req, res, next) => {
  const newRecord = new Record(req.body)
  newRecord.save()
    .then(result => res.redirect('/'))
    .catch(err => console.log(err))
})

router.get('/:id/edit', (req, res, next) => {
  const id = req.params.id
  Category.find()
    .select('name')
    .lean()
    .then(categories => {
      Record.findById(id)
        .lean()
        .then(record => {
          const categoryList = categories.map(category => {
            return {
              _id: category._id.toString(),
              name: category.name
            }
          })
          record.category = record.category.toString()
          res.render('edit', { categoryList, record })
        })
        .catch(err => console.log(err))
    })
    .catch(err => console.log(err))
})

router.put('/:id', (req, res, next) => {
  const id = req.params.id
  Record.findById(id)
    .then(record => {
      Object.assign(record, req.body)
      return record.save()
    })
    .then(res.redirect('/'))
    .catch(err => console.log(err))
})

module.exports = router