module.exports = (records) => {
  let totalAmount = 0
  records.forEach(record => totalAmount += record.amount)
  return totalAmount
}