module.exports = (option) => {
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
}