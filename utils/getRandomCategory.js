module.exports = (categoryList) => {
  const randomIndex = Math.floor(Math.random() * categoryList.length)
  return categoryList[randomIndex]
}