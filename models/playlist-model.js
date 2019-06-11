const mongoose = require('mongoose')
const Schema = mongoose.Schema

// create a schema
const playlistSchema = new Schema({
   name: String,
   googleID: String,
   channelID: String,
   username: String,
   playlistItems: Array,
})

const playlist = mongoose.model('playlist', playlistSchema)

module.exports = playlist