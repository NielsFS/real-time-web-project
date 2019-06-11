let playlist = require('../models/playlist-model')


module.exports = function(io) {

	io.on('connection', function(socket){
		console.log('made socket connection: ' + socket.id)

		socket.on('addVideo', function(data) {
			io.sockets.emit('addVideo', data)
			
			playlist.findOneAndUpdate({googleID: data.googleID},{$push:{playlistItems: data}},{new:true},(err, doc, raw) => { console.log(err) })
		})

		socket.on('removeVideo', function(data) {
			io.sockets.emit('removeVideo', data)
			
			playlist.findOneAndUpdate({googleID: data.googleID},{$pull: {playlistItems: {id: data.id}}},{multi:true},(err, doc, raw) => { console.log(err) })
			console.log('video removed from DB')
		})

	})
	
}