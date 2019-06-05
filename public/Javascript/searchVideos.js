

	const searchVideo = document.querySelector('.searchVideosForm button')
	console.log(searchVideo)

	searchInput.addEventListener("keyup", function (event) {
		console.log('nani?')
		event.preventDefault()
		if (event.keyCode === 13) {
			fetchVideos()
		}
	})


	searchVideo.addEventListener('click', fetchVideos);
		function fetchVideos() {

			let searchValue = document.getElementById('searchInput').value;

			var queryurl = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${searchValue}&type=video&maxResults=10&key=AIzaSyBrCwrC5hYMfnXd4AllfVGsG2IA-8i58aU`;
	
			fetch(queryurl)
			.then(response => response.json()) 
			.then(function (data) {
				let videofetch = data.items

				let videoObject = videofetch.map(function (video) {
					return {title: video.snippet.title, id: video.id.videoId, thumbnail: video.snippet.thumbnails.high.url} 
				})

				storage.searchYoutube = videoObject

				template.searchYoutube()
			})
		}
