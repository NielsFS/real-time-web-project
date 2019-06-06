const router = require('express').Router()
const passport = require('passport')
const User = require('../models/user-model')
const fetch = require("node-fetch")



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
	scope: ['profile', 'https://www.googleapis.com/auth/youtube', 'https://www.googleapis.com/auth/youtube.readonly'],
	accessType: 'offline',
}))

// callback route for Google redirect
router.get('/google/redirect', passport.authenticate('google'), (req,res)=> {

	
	res.redirect('/')
})

module.exports = router

