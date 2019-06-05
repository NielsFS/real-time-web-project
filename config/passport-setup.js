const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth2')
const keys = require('./keys')
const User = require('../models/user-model')

passport.serializeUser((user, done) => {
	done(null, user.id)
})

passport.deserializeUser((id, done) => {
	User.findById(id).then((user) => {
		done(null, user)
	})
})

passport.use(
	new GoogleStrategy({
		// google strategy
		callbackURL: '/auth/google/redirect',
		clientID: keys.google.clientID,
		clientSecret: keys.google.clientSecret

	}, (accessToken, refreshToken, profile, done) => {
		// check is user already exists
		User.findOne({googleID: profile.id}).then((currentUser) => {
			if(currentUser){
				console.log('current user is:' + currentUser)
				done(null, currentUser)
			} else{
				new User({
					googleID: profile.id,
					username: profile.displayName
				}).save().then((newUser) => {
					console.log('new user created:' + newUser)
					done(null, newUser)
				})
			}
		})
	})
)