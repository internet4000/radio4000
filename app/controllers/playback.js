import Ember from 'ember';

export default Ember.Controller.extend({
	// channel gets set by the track route
	channel: null,
	isMaximized: false,
	isShuffled: false,

	tracks: function() {
		return this.get('channel.tracks');
	}.property('channel.tracks.[]'),

	trackIndex: function() {
		var index = this.get('tracks').indexOf(this.get('model'));
		// Ember.debug('trackIndex return: ' + index);
		return index;
	}.property('tracks', 'model'),

	getRandomTrack: function() {
		var tracks = this.get('tracks');
		var random = Math.floor(Math.random() * tracks.get('length'));
		return tracks.objectAt(random);
	},

	actions: {
		// use this to play a track, if you don't want the url to change
		playTrack: function(track) {
			if (!track) { return false; }
			Ember.debug('Playing track: ' + track.get('title'));
		 	this.set('model', track);
		},
		playNext: function() {

			// if shuffle is on
			if (this.get('isShuffled')) {
				this.send('playTrack', this.getRandomTrack());
				return;
			}

			// if at last track, play first one
			if (this.get('trackIndex') <= 0) {
				this.send('playFirst');
				return;
			}

			var prevTrack = this.get('tracks').objectAt((this.get('trackIndex') - 1));
			Ember.debug('Playing next track');
			this.set('model', prevTrack);
		},
		playPrev: function() {
			// if we're at the first item, play the last
			if (this.get('trackIndex') === (this.get('tracks.length') - 1)) {
				this.send('playLast');
				return;
			}

			var prevTrack = this.get('tracks').objectAt((this.get('trackIndex') + 1));
			Ember.debug('Playing previous track');
			this.set('model', prevTrack);
		},
		playFirst: function() {
			Ember.debug('Playing first track');
			var firstTrack = this.get('tracks.lastObject');
			this.set('model', firstTrack);
		},
		playLast: function() {
			Ember.debug('Playing last track');
			var lastTrack = this.get('tracks').objectAt(0);
			this.set('model', lastTrack);
		},

		// Toggles "fullscreen mode"
		toggle: function() {
			this.toggleProperty('isMaximized');
		},

		ytPlaying: function() {
			// Ember.debug('on playing from controller');
		},
		ytPaused: function() {
			// Ember.debug('on paused from controller');
		},
		ytEnded: function() {
			// Ember.debug('on ended from controller');
			this.send('playNext');
		},
		ytError: function(error) {
			// Ember.debug('on yt error from controller');
			console.log(error);

			// dont do anything on 'invalid parameter'
			if (error === 2) { return; }

			// otherwise play next
			this.send('playNext');
		},
	}
});
