/*global YT */

// Load the IFrame Player API code asynchronously.
var tag = document.createElement('script');
tag.src = "http://www.youtube.com/iframe_api"; // iframe api
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

/**
 * This will set up the default YouTube player API events and sync them to the roughPlayer
 * it will also automatically call, load, play and immediately stop a video to get the API working
 */

// Settings
var muted = false;
var ytPlayer = 'Just a global for now..';
var playerOptions = {
	width: '640',
	height: '166',
	videoId: 'KPiNtH2wZM4',
	playerVars: {
		'html5': 1,
		'autoplay': 1,
		'autohide': 2,
		// 'controls': 1, // hide controls
		// 'controls': 2, // only show controls after video is loaded
		// 'controls': 0,
		// 'showinfo': 0, // hide title info etc.
		'modestbranding': 1, // hide youtube logo in controls
		'rel': 0, // dont load related videos
		'iv_load_policy': 3, // dont show video annotations
		'wmode': 'opaque',
		// 'hd': 1, // enable HD
		'enablejsapi': 1

		// to play a list of videos (not a youtube playlist) and
		// use videoId in playerVars + this playlist parameter
		// ,'playlist': 'Zs2COW8CZuw,kQFKtI6gn9Y,bXhgYdxWIxE'

		// to play a playlist, comment out videoId and
		// use listype and list
		// ,'listType': 'playlist'
		// ,'list': db.playlists[0] // prepend with 'PL' !
	},
	events: {
		'onReady': onPlayerReady,
		'onStateChange': onPlayerStateChange,
		'onError': onPlayerError
	}
};


/**
 * After API code is downloaded and ready this will automatically run
 */
function onYouTubePlayerAPIReady() {
	roughPlayer.updateGUI('onYouTubePlayerAPIReady');

	// Replace the 'ytplayer' element with an <iframe>
	// this will also trigger the next events…
	// console.log(ytplayer);
	ytPlayer = new YT.Player('ytplayer', playerOptions);
	// ytPlayer = new YT.Player('ytplayer2', playerOptions);
	// $('html').removeClass('is-loading');
}

/**
 * The API will call this function when the video player is ready.
 */
function onPlayerReady(event) {
	roughPlayer.updateGUI('onPlayerReady');

	// event.target.cueVideoById(db.videos[1], 5, "small");
	// event.target.cuePlaylist(db.playlists[1], 5, "small");
	// event.target.playVideo();


	// Start by loading a random video/playlist to properly trigger the API
	// roughPlayer.loadVideo();
	// roughPlayer.loadPlaylist();
	// ytPlayer.stopVideo();


	// Make sure we have volume
	var p = event.target;

	p.playVideo();
	p.stopVideo();

	if (!muted) {
		if (p.isMuted()) {
			p.unMute();
		}
		p.setVolume(100);
	} else {
		p.mute();
	}
}

/**
 * Called every time the player changes (often!)
 */
function onPlayerStateChange(event) {
	var state = event.data;
	// Possible state values are
	// -1 (unstarted)
	// 0 (ended) 		or YT.PlayerState.ENDED
	// 1 (playing) 		or YT.PlayerState.PLAYING
	// 2 (paused) 		or YT.PlayerState.PAUSED
	// 3 (buffering) 	or YT.PlayerState.BUFFERING
	// 5 (video cued)	or YT.PlayerState.CUED

	roughPlayer.updateGUI(state);

	// stupid dirty way to see if its a playlist
	// var singleVideo = player.getPlaylistIndex() === -1;
	// if (singleVideo) {
	// 	$('.js-prev, .js-next').attr('disabled', 'disabled');
	// } else {
	// 	$('.js-prev, .js-next').removeAttr('disabled');
	// 	console.log('I think we have more than a single video now so:');
	// 	console.log(getPlaylistLength());
	// }

	// Update title with data from current video
	// roughPlayer.updateVideoTitle();

	// Change play/pause button
	// if (state === YT.PlayerState.PLAYING) {
	// 	$('.js-playPause').text('Pause');
	// } else {
	// 	$('.js-playPause').text('Play');
	// }

	// Break on end
	if (state === YT.PlayerState.ENDED) {

		console.log('ended');

		// roughPlayer.showLoader();
		// roughPlayer.updateVideoTitle('Hey! No more roughPlayer.tv for now, go outside or read a book');
	}

	// Toggle loader
	// if (state === YT.PlayerState.PLAYING || state === YT.PlayerState.PAUSED) {
	// 	roughPlayer.hideLoader();
	// } else if (state === YT.PlayerState.BUFFERING || state === -1) {
	// 	roughPlayer.showLoader();
	// }
}

/**
 * Handles errors from the YouTube API
 */
function onPlayerError(event) {
	console.log('onError, code ' + event.data);

	switch(event.data){
		case 2:
			console.log('invalid parameter');
			break;
		case 100:
			console.log('not found/private');
			roughPlayer.nextVideo();
			break;
		case 101:
		case 150:
			console.log('the same: embed not allowed');
			roughPlayer.nextVideo();
			break;
		default:
			break;
	}
}
