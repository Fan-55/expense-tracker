module.exports = {
  formatDate: (records) => {
    if (records.length !== undefined) {
      for (const record of records) {
        record.date = record.date.toISOString().split('T')[0]
      }
    } else {
      records.date = records.date.toISOString().split('T')[0]
    }
  },
  getDateRange: (option) => {
    const month = option.split('-')[1]
    let [endDate, firstDate, lastDate] = ['', '', '']
    if (['01', '03', '05', '07', '08', '10', '12'].includes(month)) {
      endDate = '-31'
    } else {
      endDate = '-30'
    }
    firstDate = option + '-01'
    lastDate = option + endDate
    return { $gte: firstDate, $lte: lastDate }
  },
  getTotalAmount: (records) => {
    let totalAmount = 0
    records.forEach(record => totalAmount += record.amount)
    return totalAmount
  },
  getCategoryList: (model) => {
    return model.find().lean().exec()
  },
  getLocalDate: () => {
    let date = new Date().toISOString()
    date = date.slice(0, 23)
    date = new Date(date + '-08:00').toISOString()
    date = date.split('T')[0]
    return date
  }
}