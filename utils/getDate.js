module.exports = (records) => {
  if (records.length !== undefined) {
    for (const record of records) {
      record.date = record.date.toISOString().split('T')[0]
    }
  } else {
    records.date = records.date.toISOString().split('T')[0]
  }
}