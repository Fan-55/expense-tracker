const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')

const app = express()
const PORT = process.env.PORT || 3000
const routes = require('./routes/index')
require('./config/mongoose')

app.engine('hbs', exphbs({
  extname: '.hbs',
  defaultLayout: 'main',
  helpers: require('./utils/helpers')
}))
app.set('view engine', 'hbs')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(methodOverride('_method'))
app.use(express.static('public'))
app.use(routes)

app.listen(PORT, () => console.log(`This app is listening at http://loaclhost:${PORT}`))