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
  },
  getCreateRecordErrors: (name, date, category, amount) => {
    const errors = {}
    if (!name) {
      errors.name = '名稱為必填欄位。'
    }
    if (!date) {
      errors.date = '日期為必填欄位。'
    }
    if (!category) {
      errors.category = '種類為必填欄位。'
    }
    if (!amount) {
      errors.amount = '金額為必填欄位。'
    }
    return errors
  },
  getRegisterErrors: (name, email, password, confirmPassword) => {
    const errors = {}
    if (!name.trim()) {
      errors.name = '姓名欄位不能空白。'
    }
    if (!email.trim()) {
      errors.email = 'Email欄位不能空白。'
    }
    if (!password) {
      errors.password = '密碼欄位不能空白。'
    }

    if (password !== confirmPassword) {
      errors.diffPassword = '密碼與確認密碼不相符。'
    }
    return errors
  }
}