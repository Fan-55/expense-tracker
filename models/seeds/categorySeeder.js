const Category = require('../category')

const db = require('../../config/mongoose')

db.once('open', () => {
  const categorySeeds = require('./categorySeeds.json').categorySeeds
  categorySeeds.forEach(seed => {
    Category.create({ name: seed.category })
  })
  console.log('Category seeds created!')
})