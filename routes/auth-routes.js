const router = require('express').Router()
const passport = require('passport')


// auth login
router.get('/login', (req,res) => {
	res.render('login')
})

// auth logout
router.get('/logout', (req,res) => {
	req.logout()
	res.redirect('/auth/google')
})

// auth google
router.get('/google', passport.authenticate('google', {
	scope: ['profile', 'https://www.googleapis.com/auth/youtube']
}))

// callback route for Google redirect
router.get('/google/redirect', passport.authenticate('google'), (req,res)=> {
	res.send(req.user)
})

module.exports= router