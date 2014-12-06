import Ember from 'ember';

export default Ember.ObjectController.extend({
	// channel gets set by the track route
	channel: null,
	isMaximized: false,

	// the player
	player: null,
	isPlaying: false,

	// busy is when the player is changing and therefore unresponsive to actions
	busy: false,

	// TODO: use this to integrate more players, later
	proxyPlayer: function() {
		if (this.player) {
			return this.player;
		} else {
			Ember.warn('attempted to do something without a player');
			return false;
		}
	}.property('player'),

	tracks: function() {
		return this.get('channel.tracks');
	}.property('channel.tracks.[]'),

	trackIndex: function() {
		var index = this.get('tracks').indexOf(this.get('model'));
		// Ember.debug('trackIndex return: ' + index);
		return index;
	}.property('tracks', 'model'),

	actions: {

		// use this to play a track, if you don't want the url to change
		playTrack: function(track) {
			if (!track) {
				Ember.debug('no track?!');
				return false;
			}
			Ember.debug('Playing track: ' + track.get('title'));
		 	this.transitionToRoute('track', track);
		},

		// TODO: if these two are called while this.player is being set up,
		// it fails and breaks all future calls
		play: function() {
			// if (!this.player) { return false; }
			this.get('proxyPlayer').playVideo();
		},
		pause: function() {
			var player = this.get('proxyPlayer');
			console.log(player);
			if (!player) { return false; }
			player.pauseVideo();
		},
		playPrev: function() {
			if (this.get('trackIndex') === (this.get('tracks.length') - 1)) {
				this.send('playLast');
				return;
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
				return;
			}

			var prevTrack = this.get('tracks').objectAt((this.get('trackIndex') - 1));
			Ember.debug('Playing next track');
			this.transitionToRoute('track', prevTrack);
		},
		toggle: function() {
			this.toggleProperty('isMaximized');
		}
	}
});
