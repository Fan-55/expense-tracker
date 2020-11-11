if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const session = require('express-session')
const passport = require('passport')
const app = express()
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
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}))
require('./config/passport')
app.use(passport.initialize())
app.use(passport.session())
app.use(routes)

app.listen(process.env.PORT, () => console.log(`This app is listening at http://loaclhost:${process.env.PORT}`))