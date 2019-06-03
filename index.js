const express = require('express')
const app = express()
const path = require('path')
const hbs = require('express-handlebars')

app.engine('handlebars', hbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
app.use(express.static('public'))
app.set('views', path.join(__dirname, 'views'))

//////////////////////////////
// Routes
//////////////////////////////

app.get('/', (req,res) => {
	res.render('index')
})

app.get('/about', (req,res) => {
	res.render('about')
})

//////////////////////////////
// Port
//////////////////////////////

app.listen(4000, () => {
	console.log('server started on port 4000')
})