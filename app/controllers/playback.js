/*global YT*/
import Ember from 'ember';

export default Ember.ObjectController.extend({
	needs: ['playlist', 'tracks', 'track'],

	isMaximized: true,
	isPlaying: false,
	state: null,

	actions: {
		play: function() {
			this.set('isPlaying', true);
			this.player.playVideo();
		},
		pause: function() {
			this.set('isPlaying', false);
			this.player.pauseVideo();
		},
		toggle: function() {
			this.toggleProperty('isMaximized');
			// console.log(this.player);
		}
	},

	createYTPlayer: function() {
		console.log('create a YT.Player instance');
		var self = this;
		Ember.run.schedule('afterRender', function() {
			self.player = new YT.Player('player', {
				events: {
					'onReady': self.onPlayerReady,
					'onStateChange': self.onPlayerStateChange.bind(self),
					'onError': self.onPlayerError
				}
			});
			self.set('isPlaying', true);
		});
	}.observes('embedURL'),

	onPlayerReady: function() {
		Ember.debug('onPlayerReady');
	},
	onPlayerStateChange: function(event) {
		Ember.debug('onPlayerStateChange');
		console.log(event);
		this.checkPlayerState(event.data);
	},
	onPlayerError: function() {
		Ember.debug('onPlayerError');
	},

	/**
	 * Reacts on the YouTube player API events and triggers corresponding actions
	 */
	checkPlayerState: function(state) {
		console.log(state);

		// -1 (unstarted)State
		// 0 (ended) 		or YT.Player.ENDED
		// 1 (playing) 	or YT.PlayerState.PLAYING
		// 2 (paused) 		or YT.PlayerState.PAUSED
		// 3 (buffering) 	or YT.PlayerState.BUFFERING
		// 5 (video cued)	or YT.PlayerState.CUED

		if (state === 'onYouTubePlayerAPIReady') {
			this.set('state', 'apiReady');
		} else if (state === 'onPlayerReady') {
			this.set('state', 'playerReady');
			// stir.onPlayerReady();
		} else if (state === -1) {
			this.set('state', 'unstarted');
		} else if (state === 3) {
			this.set('state', 'buffering');
		} else if (state === 1) {
			this.set('state', 'playing');
			this.set('isPlaying', true);
		} else if (state === 2) {
			this.set('state', 'paused');
			this.set('isPlaying', false);
		} else if (state === 0) {
			this.set('state', 'ended');
			this.set('isPlaying', false);
			// go to next??
			// stir.onEnd();
		}

		console.log(this.get('state'));

		// Toggle loader
		// if (state === YT.PlayerState.PLAYING || state === YT.PlayerState.PAUSED) {
		// 	stir.hideLoader();
		// } else if (state === YT.PlayerState.BUFFERING || state === -1 || state === 0) {
		// 	stir.showLoader();
		// }
	}
});
