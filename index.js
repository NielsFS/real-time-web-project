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
const fetch = require("node-fetch")
const refresh = require('passport-oauth2-refresh')

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

// check if user is logged in
const authCheck = (req,res,next) => {
	if (!req.user) {
		res.redirect('/auth/google')
	} else {
		next()
	}
}





//////////////////////////////
// Routes
//////////////////////////////

// setup auth routes folder
app.use('/auth',authRoutes)

// main route
app.get('/', authCheck, (req,res) => {

	let channelID = req.user.channelID
	let testPlaylist 
	let token = req.user.accessToken

	const getData = {
		findPlaylist: function() {
			const playlist = `https://www.googleapis.com/youtube/v3/playlists?access_token=${token}&part=snippet%2CcontentDetails&channelId=${channelID}&maxResults=30`
			fetch(playlist)
			.then(response => response.json())
			.then( function (data) {
				// console.log(data)

				let allPlaylists = data.items
				let mappedPlaylists = allPlaylists.map( (playlists) => {
					return {id: playlists.id, title: playlists.snippet.title}
				} )
				
				function findTestPlaylist(obj) { 
					return obj.title === 'testPlaylist';
				}
				
				testPlaylist = mappedPlaylists.find(findTestPlaylist)
			})
		},
		loadPlaylist: function() {
			console.log('test:' + channelID)
			console.log('test2:' + testPlaylist)
			const playlist = `https://www.googleapis.com/youtube/v3/playlists?access_token=${token}&part=snippet%2CcontentDetails&channelId=${channelID}&maxResults=30`
			fetch(playlist)
			.then(response => response.json())
			.then( function (data) {
				console.log(testPlaylist)
			})
		},
		renderPage: function() {
			res.render('index', {
				user: req.user 
			})
		}
	}
	
	getData.findPlaylist()
	getData.loadPlaylist()
	getData.renderPage()
	
})
	
	

app.get('/videos', (req,res) => {

	let token = req.user.accessToken
	
	const url = `https://www.googleapis.com/youtube/v3/channels?access_token=${req.user.accessToken}&part=snippet&mine=true`
	
	fetch(url)
		.then(response => response.json())
		.then( function (data) {
			
			res.send(token)
		})
	
	
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