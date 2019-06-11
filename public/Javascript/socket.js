const socket = io.connect('http://localhost:4000')

let videoData
let videoContents = []
const previewVideolist = document.querySelector('.previewVideolist')
const popup = document.querySelector('#popup h4')
let googleID = window.location.pathname.slice(1)

const socketInteraction = {

	addVideoListener: function() {

		// const checkListener = document.querySelector('.previewVideoSearch').children[0].children[1]

		const addVideo = document.querySelectorAll('.addVideo')

		if (addVideo[0].getAttribute('listener') !== 'true'){
			for (i = 0; i < addVideo.length; i++) {
				addVideo[i].setAttribute('listener', 'true')
				addVideo[i].addEventListener('click', function(e) {
					console.log('event listener added')
					e.preventDefault()
					let selectedElement = this.nextElementSibling
					
					let id = selectedElement.dataset.id
					let thumbnail = selectedElement.children[0].src
					let title = selectedElement.children[1].children[0].innerHTML
					let description = selectedElement.children[1].children[1].innerHTML
						// googleID = window.location.pathname.slice(1)

					videoData = {
								id: id,
								title: title,
								description: description,
								thumbnail: thumbnail,
								googleID: googleID
							}
					// console.log(videoData)
					
					socketInteraction.emitAddVideo()
					
				})
			}
		}
	},
	removeVideoListener: function(){
		const removeButton = document.querySelectorAll('.removeVideo')
		for (i = 0; i < removeButton.length; i++) {
			removeButton[i].addEventListener('click', function (e) {
			
				let videoID = this.nextElementSibling.dataset.id
				let dataset = {
					id: videoID,
					googleID: googleID
				}
				socket.emit('removeVideo', dataset)
				console.log('removing video')

				let removeElement = document.querySelectorAll(`#${videoID}`)

				for (i = 0; i < removeElement.length; i++) {
					removeElement[i].parentElement.remove()
				}
			})
		}
	},
	emitAddVideo: function() {
		console.log('videodata 2 : ' + videoData)
		console.log('emitting Video')
		socket.emit('addVideo', videoData)
	}
}


socket.on('addVideo', (data) => {

	showPopup()

	function showPopup() {
		document.body.classList.add('show')
		if (googleID == data.googleID) {
			popup.innerHTML = 'video added'
		} else {
			popup.innerHTML = `${data.googleID} added video`
		}
	}

	function removePopup() {
		document.body.classList.remove('show')
	}

	setTimeout(removePopup, 3000)

	console.log(data)
	// videoContents.push(data)

	let markup = `
		<button class="removeVideo">-</button>
		<a class="dataid container" id="${data.id}"  href="#${data.id}" data-id="${data.id}">
			<img class="thumbnail" src="${data.thumbnail}">
			<div>
				<h5 class="title">${data.title}</h5>
				<h6 class="description fade">${data.title}</h6>
			</div>
		</a>
	`

	let li = document.createElement('li')
	li.innerHTML = markup
	li.classList.add('previewPlaylistVideo')

	previewVideolist.appendChild(li)

	let createdVideo = document.getElementById(`${data.id}`)
	let removeButton = createdVideo.previousElementSibling

	removeButton.addEventListener('click', function(e){
		let videoID = this.nextElementSibling.dataset.id
		let dataset = {
			id: videoID,
			googleID: googleID
		}
		socket.emit('removeVideo', dataset)
		console.log('removing video')

		let removeElement = document.querySelectorAll(`#${videoID}`)
		for (i = 0; i < removeElement.length; i++) {
			removeElement[i].parentElement.remove()
		}
	})

	createdVideo.addEventListener('click', function(e) {
		e.preventDefault()

		const iframe = document.getElementById('iframe')
		const playerTitle = document.querySelector('.title')
		const playerDescription = document.querySelector('.description')
		
		id = this.getAttribute('data-id')
		title = this.querySelector('div > h5').innerHTML
		thumbnail = this.querySelector('img').getAttribute('url')
		description = this.querySelector('div > h6').innerHTML

		iframe.src = `https://www.youtube.com/embed/${id}?autoplay=1`
		playerTitle.innerHTML = title
		playerDescription.innerHTML = description
	})
})


socket.on('removeVideo', (data) => {

	showPopup()

	function showPopup() {
		document.body.classList.add('show')
		if (googleID == data.googleID) {
			popup.innerHTML = 'video removed'
		} else {
			popup.innerHTML = `${data.googleID} removed video`
		}
	}

	function removePopup() {
		document.body.classList.remove('show')
	}
	setTimeout(removePopup, 3000)

})
