const Record = require('../record')
const Category = require('../category')

const db = require('../../config/mongoose')
const getRandomCategory = require('../../utils/getRandomCategory')
const getDate = require('../../utils/getDate')

db.once('open', () => {
  Category.find()
    .then(results => {
      const categoryList = results.map(category => { return category._id })
      for (let i = 1; i <= 10; i++) {
        const randomCategory = getRandomCategory(categoryList)
        Record.create({
          name: '測試紀錄' + i,
          category: randomCategory,
          date: getDate(new Date()),
          amount: Math.floor(Math.random() * 100) + 1
        })
      }
      console.log('Record seeds created!')
    })
    .catch(err => console.log(err))
})