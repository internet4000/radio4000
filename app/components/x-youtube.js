/*global YT*/
import Ember from 'ember';

export default Ember.Component.extend({
	debug: true,
	playerState: 'loading',
	// from YT.PlayerState
	stateNames: {
		'-1': 'unstarted',
		0: 'ended',
		1: 'playing',
		2: 'paused',
		3: 'buffering',
		5: 'queued'
	},

	// YouTube's embedded player can take a number of optional parameters.
	// Full list here: https://developers.google.com/youtube/player_parameters#Parameters
	playerVars: {
		autoplay: 0,
		controls: 1,
		enablejsapi: 1,
		rel: 0,
		showinfo: 0,
		autohide: 1
		// disablekb: 1,
		// fs: 0,
		// iv_load_policy: 3,
		// modestbranding: 1,
	},

	// Load the iframe player API asynchronously from YouTube
	loadApi: function() {
		var tag = document.createElement('script');
		tag.src = "https://www.youtube.com/iframe_api";
		var firstTag = document.getElementsByTagName('script')[0];
		firstTag.parentNode.insertBefore(tag, firstTag);

		// Youtube callback when API is ready
		window.onYouTubePlayerAPIReady = function() {
			Ember.debug('yt player api ready');
			this.createPlayer();
		}.bind(this);
	}.on('init'),

	// Creates a YouTube player
	createPlayer: function() {
		var _this = this;
		var videoId = this.get('ytid');
		var playerVars = this.get('playerVars');
		var $iframe = this.$('#ytplayer');

		var player = new YT.Player($iframe[0], {
			// videoId: 'g8MN92gCCjw',
			width: 210,
			height: 166,
			playerVars: playerVars,
			events: {
				'onReady': _this.onPlayerReady.bind(_this),
				'onStateChange': _this.onPlayerStateChange.bind(_this),
				'onError': _this.onPlayerError.bind(_this)
			}
		});

		this.set('player', player);
	},

	// Loads a video into the player
	loadVideo: function() {
		var player = this.get('player');
		var id = this.get('ytid');
		player.loadVideoById(id);
	}.observes('ytid'),


	// called by the API
	onPlayerReady: function() {
		this.set('playerState', 'yt ready');
	},

	// called by the API
	onPlayerStateChange: function(event) {
		// Get a readable state name
		var state = this.get('stateNames.' + event.data.toString());
		this.set('playerState', state);
	},

	// called by the API
	onPlayerError: function(event) {
		Ember.warn('YT error');
		this.set('playerState', 'error');
		console.log(event.data);

		// TODO: go to next video on error

		// switch(event.data) {
		// 	case 2:
		// 		Ember.warn('Invalid parameter');
		// 		break;
		// 	case 100:
		// 		Ember.warn('Not found/private');
		// 		this.send('playNext');
		// 		break;
		// 	case 101:
		// 	case 150:
		// 		Ember.warn('Embed not allowed');
		// 		this.send('playNext');
		// 		break;
		// 	default:
		// 		break;
		// }
	}

	// YouTube SRC ready for an iframe!
	// src: function() {
	// 	var params = Ember.$.params(this.get('playerVars'));
	// 	Ember.debug(params);
	// 	return '//www.youtube.com/embed/'+ this.get('ytid') + params;
	// }.property('ytid'),
});

/*
onPlayerStateChange: function(event) {
	var state = event.data;

	// -1 (unstarted)State
	// 0 (ended) 		or YT.Player.ENDED
	// 1 (playing) 	or YT.PlayerState.PLAYING
	// 2 (paused) 		or YT.PlayerState.PAUSED
	// 3 (buffering) 	or YT.PlayerState.BUFFERING
	// 5 (video cued)	or YT.PlayerState.CUED

	if (state === 'onYouTubePlayerAPIReady') {
		this.set('state', 'apiReady');
	} else if (state === 'onPlayerReady') {
		this.onPlayerReady();
	} else if (state === -1) {
		this.onUnstarted();
	} else if (state === 3) {
		this.onBuffering();
	} else if (state === 1) {
		this.onPlay();
	} else if (state === 2) {
		this.onPause();
	} else if (state === 0) {
		this.onEnd();
	}
},

onUnstarted: function() {
	this.set('state', 'buffering');
},
onBuffering: function() {
	this.set('state', 'buffering');
},
onPlay: function() {
	this.set('state', 'playing');
	this.set('isPlaying', true);
},
onPause: function() {
	this.set('state', 'paused');
	this.set('isPlaying', false);
},
onEnd: function() {
	this.set('state', 'ended');
	this.set('isPlaying', false);
	this.send('playNext');
}
*/


// https://github.com/mikecrittenden/tangletube
// https://github.com/4South/ember-youtube/blob/master/public/js/views/YoutubeView.js
// http://alg.github.io/talks/emberjs/#/title
// http://urli.st/8hw-Building-an-app-in-emberjs
// http://cejast.github.io/ng-youtube/
// https://github.com/brandly/angular-youtube-embed
// http://emberjs.com/guides/components/sending-actions-from-components-to-your-application/
