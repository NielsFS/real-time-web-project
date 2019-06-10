///////////////////////////////////
// select and load videos in player
////////////////////////////////////

const playVideo = {

	addEventListenerPreview: function() {

		const videoItem = document.querySelectorAll('.previewPlaylistVideo a')
		const iframe = document.getElementById('iframe')
		const playerTitle = document.querySelector('.title')
		const playerDescription = document.querySelector('.description')
		let id 
		let title 
		let thumbnail 
		let description 

		for (i = 0; i < videoItem.length; i++) {
			videoItem[i].addEventListener('click', function (e) {
				e.preventDefault()
		
				id = this.getAttribute('data-id')
				title = this.querySelector('div > h5').innerHTML
				thumbnail = this.querySelector('img').getAttribute('url')
				description = this.querySelector('div > h6').innerHTML
		
				iframe.src = `https://www.youtube.com/embed/${id}?autoplay=1`
				playerTitle.innerHTML = title
				playerDescription.innerHTML = description
		
				console.log(id + title + thumbnail + description)
			})
		}
	}
}

playVideo.addEventListenerPreview()





