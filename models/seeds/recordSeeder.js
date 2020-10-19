const Record = require('../record')
const Category = require('../category')

const db = require('../../config/mongoose')
const getRandomCategory = require('../../utils/getRandomCategory')

db.once('open', () => {
  Category.find()
    .then(results => {
      const categoryList = results.map(category => { return category._id })
      const randomCategory = getRandomCategory(categoryList)
      Record.create({
        name: 'test',
        category: randomCategory,
        date: Date.now(),
        amount: 100
      })
      console.log('Record seeds created!')
    })
    .catch(err => console.log(err))
})