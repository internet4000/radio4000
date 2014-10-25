/*global YT*/
import Ember from 'ember';

export default Ember.ObjectController.extend({

	// channel gets set by the track route
	channel: null,

	isMaximized: false, // fullscreen layout
	isPlaying: false,
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
		justPlay: function() {
			this.transitionToRoute('channels');
		},
		playTrack: function(track) {
			if (!track) {
				Ember.debug('no track?!');
				return false;
			}
			Ember.debug('playing track: ' + track.get('title'));
		 	this.transitionToRoute('track', track);
		},
		play: function() {
			this.set('isPlaying', true);
			this.player.playVideo();
		},
		pause: function() {
			this.set('isPlaying', false);
			this.player.pauseVideo();
		},
		playPrev: function() {
			if (this.get('trackIndex') === (this.get('tracks.length') - 1)) {
				Ember.debug('at newest track already, playing last');
				this.send('playTrack', this.get('tracks').objectAt(0));
				return false;
			}

			Ember.debug('playPrev');
			var prevTrack = this.get('tracks').objectAt((this.get('trackIndex') + 1));
			this.send('playTrack', prevTrack);
		},
		playNext: function() {
			if (this.get('trackIndex') <= 0) {
				Ember.debug('last or no track, playing first');
				this.send('playTrack', this.get('tracks.lastObject'));
				return false;
			}

			Ember.debug('playNext');
			var prevTrack = this.get('tracks').objectAt((this.get('trackIndex') - 1));
			this.send('playTrack', prevTrack);
		},
		toggle: function() {
			this.toggleProperty('isMaximized');
		}
	},



	/**
	 * @todo: put everything below here into another file. a mixin?
	 */

	createYTPlayer: function() {
		console.log('create a YT.Player instance');
		var self = this;
		Ember.run.schedule('afterRender', function() {
			self.player = new YT.Player('player', {
				events: {
					'onReady': self.onPlayerReady,
					'onStateChange': self.onPlayerStateChange.bind(self),
					'onError': self.onPlayerError.bind(self)
				}
			});
			self.set('isPlaying', true);
		});
	}.observes('embedURL'),
	onPlayerReady: function() {
		// Ember.debug('onPlayerReady');
	},
	onPlayerStateChange: function(event) {
		// Ember.debug('onPlayerStateChange');
		this.checkPlayerState(event.data);
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
			this.send('playNext');
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
