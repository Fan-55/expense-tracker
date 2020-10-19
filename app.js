const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000
require('./config/mongoose')

app.listen(PORT, () => console.log(`This app is listening at ${PORT}`))