const Record = require('../record')
const Category = require('../category')

const db = require('../../config/mongoose')

const getRandomCategory = require('../../utils/getRandomCategory')
const getDate = require('../../utils/getDate')
const getRandomAmount = require('../../utils/getRandomAmount')

db.once('open', () => {
  Category.find()
    .then(categories => {
      const categoryList = categories.map(category => { return category._id })
      for (let i = 1; i <= 10; i++) {
        Record.create({
          name: '測試紀錄:' + i,
          category: getRandomCategory(categoryList),
          date: getDate(new Date()),
          amount: getRandomAmount(1, 100)
        })
      }
    })
    .catch(err => console.log(err))
})