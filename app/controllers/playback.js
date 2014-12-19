import Ember from 'ember';

export default Ember.Controller.extend({
	// channel gets set by the track route
	channel: null,
	isMaximized: false,

	tracks: function() {
		return this.get('channel.tracks');
	}.property('channel.tracks.[]'),

	trackIndex: function() {
		var index = this.get('tracks').indexOf(this.get('model'));
		// Ember.debug('trackIndex return: ' + index);
		return index;
	}.property('tracks', 'model'),

	actions: {
		ytPlaying: function() {
			Ember.debug('on playing from controller');
		},
		ytPaused: function() {
			Ember.debug('on paused from controller');
		},
		ytEnded: function() {
			// Ember.debug('on ended from controller');
			this.send('playNext');
		},
		ytError: function(error) {
			Ember.debug('on yt error from controller');

			// dont do anything on 'invalid parameter'
			if (error === 2) { return; }

			// otherwise play next
			this.send('playNext');
		},

		// use this to play a track, if you don't want the url to change
		playTrack: function(track) {
			if (!track) {
				Ember.debug('no track?!');
				return false;
			}
			Ember.debug('Playing track: ' + track.get('title'));
		 	// this.transitionToRoute('track', track);
		 	this.set('model', track);
		},
		playPrev: function() {
			if (this.get('trackIndex') === (this.get('tracks.length') - 1)) {
				this.send('playLast');
				return;
			}

			var prevTrack = this.get('tracks').objectAt((this.get('trackIndex') + 1));
			Ember.debug('Playing previous track');
			this.set('model', prevTrack);
			// this.transitionToRoute('track', prevTrack);
		},
		playFirst: function() {
			Ember.debug('Playing first track');
			var firstTrack = this.get('tracks.lastObject');
			// this.transitionToRoute('track', firstTrack);
			this.set('model', firstTrack);
		},
		playLast: function() {
			Ember.debug('Playing last track');
			var lastTrack = this.get('tracks').objectAt(0);
			// this.transitionToRoute('track', lastTrack);
			this.set('model', lastTrack);
		},
		playNext: function() {

			// if at last track, play first one
			if (this.get('trackIndex') <= 0) {
				this.send('playFirst');
				return;
			}

			var prevTrack = this.get('tracks').objectAt((this.get('trackIndex') - 1));
			Ember.debug('Playing next track');
			// this.transitionToRoute('track', prevTrack);
			this.set('model', prevTrack);
		},
		toggle: function() {
			this.toggleProperty('isMaximized');
		}
	}
});
