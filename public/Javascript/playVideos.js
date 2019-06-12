///////////////////////////////////
// select and load videos in player
////////////////////////////////////

const iframe = document.getElementById('iframe')
const playerTitle = document.querySelector('.title')
const playerDescription = document.querySelector('.description')

const playVideo = {

	addEventListenerPlaylistVideo: function() {

		const videoItem = document.querySelectorAll('.previewPlaylistVideo a')
		

		for (i = 0; i < videoItem.length; i++) {
			videoItem[i].addEventListener('click', function (e) {
				e.preventDefault()
		
				let id = this.getAttribute('data-id')
				let title = this.querySelector('div > h5').innerHTML
				let thumbnail = this.querySelector('img').getAttribute('url')
				let description = this.querySelector('div > h6').innerHTML
		
				iframe.src = `https://www.youtube.com/embed/${id}?autoplay=1`
				playerTitle.innerHTML = title
				playerDescription.innerHTML = description
		
			})
		}	
	},
	addEventListenerSearchVideo: function() {
		const videoItem = document.querySelectorAll('.previewVideoSearch a')

		// const checkListener = document.querySelector('.previewVideolist').children[0].children[1]
		if (videoItem[0].getAttribute('listener') !== 'true'){
			for (i = 0; i < videoItem.length; i++) {

				videoItem[i].setAttribute('listener', 'true')

				videoItem[i].addEventListener('click', function (e) {
					e.preventDefault()
			
					let id = this.getAttribute('data-id')
					let title = this.querySelector('div > h5').innerHTML
					let thumbnail = this.querySelector('img').getAttribute('url')
					let description = this.querySelector('div > h6').innerHTML
			
					iframe.src = `https://www.youtube.com/embed/${id}?autoplay=1`
					playerTitle.innerHTML = title
					playerDescription.innerHTML = description

				})
			}
		}
	}
}

playVideo.addEventListenerPlaylistVideo()
socketInteraction.removeVideoListener()





