const Record = require('../record')
const Category = require('../category')

const db = require('../../config/mongoose')

db.once('open', async () => {
  try {
    const categories = await Category.find().lean()
    const records = require('./data/record.json').records
    for (const record of records) {
      const targetId = categories.find(category => record.category === category.name)._id
      record.category = targetId
    }

    await Record.insertMany(records)
    console.log('Category seeds created!')
    db.close()

  } catch (err) {
    console.log(err)
  }
})