const Category = require('../models/category')

module.exports = async (req, res, next) => {
  try {
    res.locals.categoryList = await Category.find().lean()
    next()
  } catch (err) {
    console.log(err)
    next(err)
  }
}