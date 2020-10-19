const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')

const app = express()
const PORT = process.env.PORT || 3000
const routes = require('./routes/index')
require('./config/mongoose')

app.engine('hbs', exphbs({ extname: '.hbs', defaultLayout: 'main' }))
app.set('view engine', 'hbs')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(routes)

app.listen(PORT, () => console.log(`This app is listening at ${PORT}`))