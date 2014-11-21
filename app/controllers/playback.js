/*global YT*/
import Ember from 'ember';

export default Ember.ObjectController.extend({
	channel: null, // channel gets set by the track route
	isMaximized: false, // fullscreen layout
	isPlaying: false,
	player: null, //youtube player
	state: null, // youtube player state

	tracks: function() {
		return this.get('channel.tracks');
	}.property('channel.tracks.[]'),

	trackIndex: function() {
		var index = this.get('tracks').indexOf(this.get('model'));
		Ember.debug('trackIndex return: ' + index);
		return index;
	}.property('tracks', 'model'),

	actions: {
		// playTrack: function(track) {
		// 	if (!track) {
		// 		Ember.debug('no track?!');
		// 		return false;
		// 	}
		// 	Ember.debug('Playing track: ' + track.get('title'));
		//  	this.transitionToRoute('track', track);
		// },



		// TODO: if these two are called while this.player is being set up,
		// it fails and breaks all future calls
		play: function() {
			// if (!this.player) { return false; }
			// console.log(this.player);
			this.player.playVideo();
		},
		pause: function() {
			// if (!this.player) { return false; }
			// console.log(this.player);
			this.player.pauseVideo();
		},

		playPrev: function() {
			if (this.get('trackIndex') === (this.get('tracks.length') - 1)) {
				this.send('playLast');
				return false;
			}

			var prevTrack = this.get('tracks').objectAt((this.get('trackIndex') + 1));
			Ember.debug('Playing previous track');
			this.transitionToRoute('track', prevTrack);
		},
		playFirst: function() {
			Ember.debug('Playing first track');
			var firstTrack = this.get('tracks.lastObject');
			this.transitionToRoute('track', firstTrack);
		},
		playLast: function() {
			Ember.debug('Playing last track');
			var lastTrack = this.get('tracks').objectAt(0);
			this.transitionToRoute('track', lastTrack);
		},
		playNext: function() {
			if (this.get('trackIndex') <= 0) {
				this.send('playFirst');
				return false;
			}

			var prevTrack = this.get('tracks').objectAt((this.get('trackIndex') - 1));
			Ember.debug('Playing next track');
			this.transitionToRoute('track', prevTrack);
		},
		toggle: function() {
			this.toggleProperty('isMaximized');
		}
	},

	/**
	 * @todo: put everything below here into another file. a mixin?
	 */

	createYTPlayer: function() {
		var _this = this;

		// // no need to create it again?
		// if (this.get('player')) {
		// 	console.log('we already have a player');
		// 	this.get('player').loadVideoByURL('')


		// 	return;
		// }

		Ember.run.schedule('afterRender', function() {
			console.log('Creating a new YT.Player instance');
			var player = new YT.Player('player', {
				events: {
					'onReady': _this.onPlayerReady.bind(_this),
					'onStateChange': _this.onPlayerStateChange.bind(_this),
					'onError': _this.onPlayerError.bind(_this)
				}
			});
			_this.set('player', player);
		});
	}.observes('embedURL'),

	onPlayerReady: function() {
		console.log(this);
		this.set('state', 'playerReady');
	},
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

		console.log(this.get('state'));

		// Toggle loader
		// if (state === YT.PlayerState.PLAYING || state === YT.PlayerState.PAUSED) {
		// 	stir.hideLoader();
		// } else if (state === YT.PlayerState.BUFFERING || state === -1 || state === 0) {
		// 	stir.showLoader();
		// }
	},
	onPlayerError: function(event) {
		Ember.warn('onError, code ' + event.data);
		switch(event.data){
			case 2:
				Ember.warn('invalid parameter');
				break;
			case 100:
				Ember.warn('not found/private');
				this.send('playNext');
				break;
			case 101:
			case 150:
				Ember.warn('the same: embed not allowed');
				// this.set('model.description', 'gema fuck');
				this.send('playNext');
				break;
			default:
				break;
		}
	},

	// abstracted methods, called by our players (e.g. youtube/soundcloud etc.)
	onUnstarted: function() {
		this.set('state', 'unstarted');
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
});
