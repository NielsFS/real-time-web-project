const express = require('express')
const app = express()
const exphbs = require('express-handlebars')

app.engine('handlebars', exphbs({ defaultLayout: 'main'}))
app.set('view engine', 'handlebars')

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