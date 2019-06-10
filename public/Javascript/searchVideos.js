// /////////////////////////////////
// toggle playlist and search videos
// /////////////////////////////////
const buttonLeft = document.querySelector('.buttonLeft')
const buttonRight = document.querySelector('.buttonRight')
const searchVideos = document.getElementById('searchVideosContainer')
const playlistVideos = document.getElementById('videoListContainer')

function showSearchlist() {
	if(searchVideos.style.display = 'none') {
		buttonRight.style.background = 'rgb(192, 5, 36)'
		buttonRight.style.color = 'white'
		buttonLeft.style.color = 'black'
		buttonLeft.style.background = 'white'
		searchVideos.style.display = 'block'
		playlistVideos.style.display = 'none'
	} 
 }

 function showPlaylist() {	
	if(searchVideos.style.display = 'block') {
		buttonRight.style.background = 'white'
		buttonRight.style.color = 'black'
		buttonLeft.style.color = 'white'
		buttonLeft.style.background = 'rgb(192, 5, 36)'
		searchVideos.style.display = 'none'
		playlistVideos.style.display = 'block'
	} 
 }


 // /////////////////////////////////
// search and fetch videos 
// /////////////////////////////////


const searchButton = document.querySelector('.searchVideosForm button')
const searchInput = document.querySelector('.searchVideosForm input')
let videoObject 

searchInput.addEventListener("keyup", function (event) {
	event.preventDefault()
	if (event.keyCode === 13) {
		showSearchlist()
		fetchVideos()
	}
})

searchButton.addEventListener('click', fetchVideos)

function fetchVideos() {

	let searchValue = document.getElementById('searchInput').value;

	var queryurl = `https://www.googleapis.com/youtube/v3/search?access_token=${token}&part=snippet&q=${searchValue}&type=video&videoEmbeddable=true&maxResults=5`;

	fetch(queryurl)
	.then(response => response.json()) 
	.then(function (data) {
		let videofetch = data.items
		videoObject = videofetch.map(function (video) {
			return {title: video.snippet.title, id: video.id.videoId, thumbnail: video.snippet.thumbnails.high.url, description: video.snippet.description} 
		})
	console.log(videoObject)
	searchYoutube()
	})
}

function searchYoutube () {
	
	console.log(videoObject)
	let directives = {
		thumbnail: {
			src: function() {
			return this.thumbnail
			}
		},

		dataid: {
			'data-id': function() {
				return this.id
			}
		},

		// videoId: {
		
		// 	title: function() {
		// 		return this.title
		// 	},
		// 	id: function() {
		// 		return this.id
		// 	}
		// 	// ,
		// 	// thumbnail: function() {
		// 	// 	return this.thumbnail
		// 	// }
		// }
	}
	
	Transparency.render(document.querySelector('.previewVideoSearch'), videoObject, directives)
	playVideo.addEventListenerPreview()
}