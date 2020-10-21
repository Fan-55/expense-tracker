const Category = require('../category')

const db = require('../../config/mongoose')

db.once('open', () => {
  const categories = require('../category.json').categories

  Category.insertMany(categories)
    .then(results => {
      console.log('Category seeds created!')
      db.close()
    })
    .catch(err => console.log(err))
})