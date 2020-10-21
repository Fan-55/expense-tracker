const mongoose = require('mongoose')
const Schema = mongoose.Schema

const categorySchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  icon: {
    type: String,
    default: '<i class="far fa-user"></i>'
  }
})

module.exports = mongoose.model('Category', categorySchema)