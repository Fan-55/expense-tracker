module.exports = {
  if_equal: function (a, b, options) {
    if (a === b) {
      return options.fn(this)
    }
  },
  if_true: function (con1, con2, options) {
    if (con1 || con2) {
      return options.fn(this)
    }
  }
}