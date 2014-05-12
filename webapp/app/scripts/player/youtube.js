(function(){

var youtube;
function onYouTubeIframeAPIReady() {
	youtube = new YT.Player('player', {
		// height: '390',
		// width: '640',
		// videoId: mykey,
		// playerVars: {
		// 	'autoplay': 1
		// },
		events: {
			'onReady': onPlayerReady,
			'onStateChange': onPlayerStateChange,
			'onError': onPlayerError
		}
	});
}

// The API will call this function when the video player is ready.
function onPlayerReady(event) {
	console.log('YouTube onPlayerReady');
	// event.target.playVideo();
}

function onPlayerStateChange(event) {
	console.log(event.data);
}

function onPlayerError(event) {
	console.log(event);
}

});
