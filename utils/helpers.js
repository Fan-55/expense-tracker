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
  },
  if_idEqual: function (objectId1, objectId2, options) {
    if (objectId1.toString() === objectId2.toString()) {
      return options.fn(this)
    }
  }
}