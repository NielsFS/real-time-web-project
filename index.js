const express = require('express')
const app = express()
const path = require('path')
const hbs = require('express-handlebars')

const authRoutes = require('./routes/auth-routes')
const passportSetup = require('./config/passport-setup')
const mongoose = require('mongoose')
const keys = require('./config/keys')
const cookieSession = require('cookie-session')
const passport = require('passport')

const {google} = require('googleapis')
const queryString = require('query-string')


app.engine('handlebars', hbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
app.use(express.static('public'))
app.set('views', path.join(__dirname, 'views'))

app.use(cookieSession({
	maxAge: 24 * 60 * 60 * 1000,
	keys: [keys.session.cookieKey]
}))

// initialize passport
app.use(passport.initialize())
app.use(passport.session())

//////////////////////////////
// Routes
//////////////////////////////

// setup auth routes folder
app.use('/auth',authRoutes)

// main route
app.get('/', (req,res) => {
		res.render('index')
	})

//////////////////////////////
// Database
//////////////////////////////

mongoose.connect(keys.mongoDB.dbURI, () => {
	console.log('connected to mongodb')
	console.log(keys.mongoDB.dbURI)
})

//////////////////////////////
// Port
//////////////////////////////

app.listen(4000, () => {
	console.log('server started on port 4000')
})