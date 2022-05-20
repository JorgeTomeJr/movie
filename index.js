const express = require('express')
const app = express()
app.use(express.urlencoded())
const { engine } = require('express-handlebars')
const routes = require('./routes')
require('dotenv').config()
const helpers = require('./helpers/handlebars')

app.use(express.static('public'))
app.engine('handlebars', engine({
    helpers: helpers
}))
app.set('view engine', 'handlebars')
app.use('/', routes)

app.listen(8080, () => {
    console.log(`Servidor iniciado`)
})

