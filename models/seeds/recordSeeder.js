if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const Record = require('../record')
const Category = require('../category')
const User = require('../user')
const bcrypt = require('bcryptjs')

const db = require('../../config/mongoose')

db.once('open', async () => {
  try {
    //create seed users
    const USER_SEEDS = require('./data/user.json').users
    for (const USER of USER_SEEDS) {
      const salt = await bcrypt.genSalt(10)
      const hash = await bcrypt.hash(USER.password, salt)
      USER.password = hash
    }
    const users = await User.insertMany(USER_SEEDS)

    //replace seed record's category with categoryId and assign record to seed user
    const categoryList = await Category.find().lean().exec()
    const RECORD_SEEDS = require('./data/record.json').records
    for (const RECORD of RECORD_SEEDS) {
      const randomIndex = Math.floor(Math.random() * users.length)
      const categoryId = categoryList.find(category => category.name === RECORD.category)._id
      RECORD.category = categoryId
      RECORD.userId = users[randomIndex]._id
    }

    await Record.insertMany(RECORD_SEEDS)
    console.log('record seeds created!')
    db.close()

  } catch (err) {
    console.log(err)
    db.close()
  }
})