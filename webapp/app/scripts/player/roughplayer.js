/*global ytPlayer, YT */

var apiKey = 'AIzaSyCk5FiiPiyHON7PMLfLulM9GFmSYt6W5v4';

var roughPlayer = {

	firstPlay: true,
	isPlaylist: false,
	alreadyPlayed: [],
	shuffle: false,

	/**
	 * Play the video
	 */
	playVideo: function() {
		ytPlayer.playVideo();
	},

	/**
	 * Pause the video
	 */
	pauseVideo: function() {
		ytPlayer.pauseVideo();
	},

	// Plays the first video in a playlist. Useful since looping doesn't work
	restartPlaylist: function() {
		ytPlayer.playVideoAt(0);
	},

	/**
	 * Go to next video
	 */
	nextVideo: function() {

		if (roughPlayer.isPlaylist && roughPlayer.shuffle) {
			var random = roughPlayer.getRandomArbitary(0, ytPlayer.getPlaylist().length);
			console.log('Playing video no. ' + random);
			ytPlayer.playVideoAt(random);
			roughPlayer.alreadyPlayed.push(random);

			// Update title with data from current video
			$('.Number').text(' - currently playing no. ' + random + ' of ' + ytPlayer.getPlaylist().length);

		} else {
			ytPlayer.nextVideo();
		}
	},

	/**
	 * Go to previous video
	 */
	previousVideo: function() {
		ytPlayer.previousVideo();
	},

	/**
	 * Returns true if video is playing
	 */
	isPlaying: function() {
		return ytPlayer.getPlayerState() === YT.PlayerState.PLAYING;
	},

	loadVideo: function(videoId) {
		ytPlayer.loadVideoById({
			'videoId': 'kQFKtI6gn9Y'
			// ,'startSeconds': 20,
			// 'endSeconds': 60,
			// 'suggestedQuality': 'large'
		});

		roughPlayer.updatePlaylistTitle('');
	},

	/**
	 * Load a playlist
	 * without arguments it will take a random one
	 */
	loadPlaylist: function(playlist) {
		roughPlayer.isPlaylist = true;

		// If no playlist is supplied, use a random one from our local database
		if (!playlist) {
			playlist = db.playlists[ Math.floor(Math.random() * db.playlists.length) ];
		}

		console.log('Loading and cueing playlist ' + playlist);


		// Load and play it
		ytPlayer.loadPlaylist({
			listType: 'playlist',
			list: playlist
		});

		// on first play roughPlayer.updategui will make sure its a random track



		// setTimeout(function(){
		// 	console.log('here');
		// 	// ytPlayer.playVideoAt(16);
		// 	roughPlayer.playVideo();
		// }, 1000);

		// ytPlayer.clearVideo();

		// roughPlayer.nextVideo();
		// roughPlayer.nextVideo();
		// setTimeout(roughPlayer.playVideo, 1000);
		// setTimeout(roughPlayer.nextVideo, 1200);

		// roughPlayer.pauseVideo();
		// roughPlayer.nextVideo();

		// Reset the already played list
		roughPlayer.alreadyPlayed = [0];

		// Update GUI
		roughPlayer.getPlaylistInfo(playlist);
	},

	/**
	 * Load a playlist from a search query
	 */
	loadSearch: function(query) {

		// error handling
		if (!query) {
			console.log('no query');
			return false;
		}

		// load a playlist from the search query
		ytPlayer.loadPlaylist({
			listType: 'search',
			list: query
		});

		// // Add a fake loading-experience
		// $('.Search-submit').text('Loading…');

		// function defaultSearch() {
		// 	$('.Search-submit').text('Search');
		// }

		// var changeBack = window.setTimeout(defaultSearch(), 1000);
	},

	/**
	 * Show loading screen
	 */
	showLoader: function() {
		$('.Loader').removeClass('is-hidden');
	},

	/**
	 * Hide loading screen
	 */
	hideLoader: function() {
		$('.Loader').addClass('is-hidden');
	},

	/**
	 * Update the GUI to reflect player state
	 */
	updateGUI: function(state) {
		console.log('state: ' + state);

		var timeoutID;
		var readableState;

		if (state === 'onYouTubePlayerAPIReady') {
			readableState = 'apiReady';

		} else if (state === 'onPlayerReady') {
			readableState = 'playerReady';

		} else if (state === -1) {
			readableState = 'unstarted';

			if (roughPlayer.firstPlay) {

				// console.log('first play');

				// roughPlayer.nextVideo();

				// var test = ytPlayer.getPlaylist().length;
				// console.log(test);

				// $('.PlayListTitle').text(roughPlayer.getVideoData().title);

				roughPlayer.firstPlay = false;
			}

		} else if (state === 3) {
			readableState = 'buffering';

			// If it starts playing before the ended timer resets the playlist, we don't need to reset so clear the timer
			console.log('clearing timeout');
			window.clearTimeout(timeoutID);

		} else if (state === 1) {
			readableState = 'playing';


		} else if (state === YT.PlayerState.ENDED) {
			readableState = 'ended';
			console.log('yt.ended');

			// console.log('Player ended. Waiting 2 seconds to restart playlist…');
			// timeoutID = window.setTimeout(roughPlayer.restartPlaylist, 2000);
		}

		// -1 (unstarted)State
		// 0 (ended) 		or YT.ytPlayer.ENDED
		// 1 (playing) 		or YT.PlayerState.PLAYING
		// 2 (paused) 		or YT.PlayerState.PAUSED
		// 3 (buffering) 	or YT.PlayerState.BUFFERING
		// 5 (video cued)	or YT.PlayerState.CUED

		$('html').attr('data-state', readableState);
	},

	/**
	 * Inserts the current video title
	 */
	updateVideoTitle: function(title) {
		if (!title) {
			title = roughPlayer.getVideoData().title;
		}

		$('.VideoTitle').text(title);
	},

	/**
	 * Inserts the current playlist title
	 */
	updatePlaylistTitle: function(title) {
		if (!title) {
			console.log('no title');
			return;
		}

		$('.PlaylistTitle').text(title);
	},

	getRandomId: function() {
		var randomId = 0;

		while (roughPlayer.alreadyPlayed.indexOf(randomId) !== -1) {
			randomId = Math.floor(Math.random * 30);
		}

		return randomId;
	},

	/**
	 * Returns a random number between min and max
	 */
	getRandomArbitary: function(min, max) {
	    return Math.round(Math.random() * (max - min) + min);
	},

	/**
	 * Returns an object with video data
	 */
	getVideoData: function() {
		// console.log(ytPlayer.getDebugText());
		var videoData = ytPlayer.getVideoData();

		return {
			title: videoData.title,
			video_id: videoData.video_id,
			author: videoData.author
		};
	},

	/**
	 * Queries the YouTube API to get a JSON return with some playlist info
	 * that we can then use in our app
	 */

	/*
	docs: https://developers.google.com/youtube/v3/sample_requests
	sample request url: https://www.googleapis.com/youtube/v3/channels?part=contentDetails&mine=true

	part can be be:

	snippet
	contentDetails
	player
	statistics
	status
	*/

	// Playlist query. Docs: https://developers.google.com/youtube/v3/docs/playlists/list
	getPlaylistInfo: function(playlist) {
		var query = 'https://www.googleapis.com/youtube/v3/playlists?key='+apiKey+'&part=snippet,contentDetails&id=' + playlist;

		$.getJSON(query).done(function(data){
			// console.log(data);

			var title = data.items[0].snippet.title; // "Tunes 2013"
			var channelTitle = data.items[0].snippet.channelTitle; // "Oskar Rough"
			// var description = data.items[0].snippet.description;
			// var thumbnail = data.items[0].snippet.thumbnails.default.url; // default can also be high/medium

			// roughPlayer.updatePlaylistTitle(channelTitle + ': ' + title);
			roughPlayer.updatePlaylistTitle(title);
		});
	},

	// Playlist item query. Docs: https://developers.google.com/youtube/v3/docs/playlistItems/list
	getPlaylistItemInfo: function(playlist) {
		var query = 'https://www.googleapis.com/youtube/v3/playlistItems?key='+apiKey+'&part=contentDetails&playlistId=' + playlist;

		$.getJSON(query).done(function(data){
			// console.log(data);
		});
	},

	// https://developers.google.com/youtube/v3/docs/videos/list
	getVideoInfo: function(videoId) {
		var query = 'https://www.googleapis.com/youtube/v3/videos?key='+apiKey+'&part=contentDetails&id=' + videoId;

		// possible parts:
		// id, snippet, contentDetails, fileDetails, liveStreamingDetails, player, processingDetails, recordingDetails, statistics, status, suggestions, and topicDetails.

		$.getJSON(query).done(function(data){
			// console.log(data);

			// var title = data.items[0].snippet.title;
			var duration = data.items[0].contentDetails.duration;
			// var embedHTML = data.items[0].ytPlayer.embedHTML;
			// var statistics = data.items[0].statistics;
		});
	},

	getPlaylistLength: function(playlist) {
		var query = 'https://www.googleapis.com/youtube/v3/playlistItems?key='+apiKey+'&part=id&maxResults=0&playlistId=' + playlist;

		$.getJSON(query).done(function(data){
			console.log(data.pageInfo.totalResults);
		});
	}
};
