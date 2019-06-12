const express = require('express')
const path = require('path')
const hbs = require('express-handlebars')

const authRoutes = require('./routes/auth-routes')
const passportSetup = require('./config/passport-setup')
const mongoose = require('mongoose')
const keys = require('./config/keys')
const cookieSession = require('cookie-session')
const passport = require('passport')
const fetch = require('node-fetch')
const refresh = require('passport-oauth2-refresh')
const socket = require('socket.io')

const {google} = require('googleapis')
const queryString = require('query-string')



const app = express()

app.set('port', (process.env.PORT || 4000));

const server = app.listen(app.get('port'), function() {
	console.log('Node app is running on port', app.get('port'));
  })

const socketFolder = require('./socket')
const io = socket(server)
socketFolder(io)


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

app.get('/test', (req,res) => {
	res.send('wut')
})

app.get('/', (req,res) => {
	res.redirect('/auth/google')
})


// main route
app.get('/:id', authCheck, (req,res) => {

	let playlist = require('./models/playlist-model')

	let token = req.user.accessToken
	let googleID = req.user.googleID
	let channelID = req.user.channelID
	let username = req.user.username
	let testPlaylist
	let testPlaylistID
	let mappedPlaylistItems 

	const getData = {
		findPlaylist: function() {
			const playlist = `https://www.googleapis.com/youtube/v3/playlists?access_token=${token}&part=snippet%2CcontentDetails&channelId=${channelID}&maxResults=10`
			fetch(playlist)
			.then(response => response.json())
			.then( function (data) {

				let allPlaylists = data.items
				let mappedPlaylists = allPlaylists.map( (playlists) => {
					return {id: playlists.id, title: playlists.snippet.title}
				} )
				
				function findTestPlaylist(obj) { 
					return obj.title === 'testPlaylist';
				}

				testPlaylist = mappedPlaylists.find(findTestPlaylist)

				if (testPlaylist != null) {
					testPlaylistID = testPlaylist.id
					getData.loadPlaylist()
				} else  {
					console.log('creating Youtube Playlist')
					fetch (`https://www.googleapis.com/youtube/v3/playlists?&access_token=${token}&part=snippet`, {

						method: 'post',
						body: JSON.stringify({"snippet":{"title":"testPlaylist"}}),
						headers: {
						  "Content-Type": "application/json",
						  'authorization': `Bearer ${token}`
						}

					})
					.then((response) => {
						response.json().then((data) => {
							testPlaylistID = data.id
							return testPlaylistID
						})
						.then( function () {
							fetch(`https://www.googleapis.com/youtube/v3/playlistItems?access_token=${token}&part=snippet`, {
								method: 'post',
								body: JSON.stringify({"snippet":{"playlistId":`${testPlaylistID}`, "resourceId":{"videoId":"hwZNL7QVJjE","kind":"youtube#video"}}}),
								headers: {
								  "Content-Type": "application/json",
								  'authorization': `Bearer ${token}`
								}
							}).then(() => {
								getData.loadPlaylist()
								console.log('video added to created playlist')
							})
						})
					})
				}
			})
		},
		loadPlaylist: function() {

			const playlistItems = `https://www.googleapis.com/youtube/v3/playlistItems?access_token=${token}&part=snippet%2CcontentDetails&maxResults=50&playlistId=${testPlaylistID}`	
			fetch(playlistItems)
			.then(response => response.json())
			.then( function (data) {
				let allPlaylistItems = data.items
				mappedPlaylistItems = allPlaylistItems.map( (video) => {
					return {id: video.snippet.resourceId.videoId, title: video.snippet.title, thumbnail: video.snippet.thumbnails.high.url, description: video.snippet.description }
				} )
			})
			.then(() => {
				getData.createDB()
				getData.renderPage()
			})
		},
		createDB: function() {
			new playlist({
				googleID: googleID,
				channelID: channelID,
				username: username,
				name: 'testPlaylist',
				playlistItems: mappedPlaylistItems,
			}).save().then((newPlaylist) => {
				console.log('new playlist in DB created:')
			})

		},
		renderPage: function() {
			res.render('index', {
				token: token,
				overview: mappedPlaylistItems,
				user: req.user,
				id: mappedPlaylistItems[0].id,
				title: mappedPlaylistItems[0].title,
				description: mappedPlaylistItems[0].description
			})
		},
		findDatabase: function() {
			playlist.findOne({googleID: googleID}).then((playlistFound) => {
				if(playlistFound){
					console.log('playlist found in database')
					playlist = playlistFound
					res.render('index', {
						token: token,
						user: req.user,
						overview: playlist.playlistItems,
						id: playlist.playlistItems[0].id,
						title: playlist.playlistItems[0].title,
						description: playlist.playlistItems[0].description
					})
				} else {
					console.log('playlist not found in database')
					getData.findPlaylist()
				}
			})
		}
	}
	getData.findDatabase()
})
	
	

//////////////////////////////
// Database
//////////////////////////////

mongoose.connect(keys.mongoDB.dbURI, () => {
	console.log('connected to mongodb')
})

//////////////////////////////
// Port
//////////////////////////////



