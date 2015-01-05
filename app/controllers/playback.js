import Ember from 'ember';

export default Ember.Controller.extend({
	isMaximized: false,
	isShuffled: true,

	// channel gets set by the track route
	channel: null,

	// all listened tracks
	// history: [],
	history: Ember.A([]),

	// all tracks not in the history array
	// there is probably a computed macro to handle this.
	unplayed: Ember.computed('history.[]', 'tracks.[]', function () {
		var history = this.get('history');
		var tracks = this.get('tracks');

		if (!tracks) { return; }

		return tracks.filter(function(track) {
			return !history.contains(track);
		});
	}),

	// tracks from the current channel
	tracks: function() {
		return this.get('channel.tracks');
	}.property('channel.tracks.[]'),

	// gets the index of the current track
	getCurrentTrackIndex: function() {
		return this.get('tracks').indexOf(this.get('model'));
	}.property('tracks', 'model'),

	// gets a random track
	getRandomTrack: function() {
		var random = Math.floor(Math.random() * this.get('tracks.length'));
		return this.get('tracks').objectAt(random);
	},

	clearHistory: function() {
		this.get('history').clear();
	},

	actions: {
		// use this to play a track, if you don't want the url to change
		playTrack: function(track) {
			if (!track) { return false; }
			Ember.debug('Playing track: ' + track.get('title'));
		 	this.set('model', track);
		},

		playPrev: function() {
			var history = this.get('history');
			var idx = history.indexOf(this.get('model'));
			var newTrack;

			// if there is an idx, e.g. an active item
			if (idx !== -1) {
				// set the new active to the prev item from the active one
				newTrack = history.objectAt(idx - 1);
				Ember.debug(newTrack);
			}

			// if no new track, play the last (e.g. first… omg)
			if (!newTrack) {
				return this.send('playFirst');
			}

			if (!this.get('isShuffled')) {
				this.get('history').pushObject(newTrack);
			}

			this.set('model', newTrack);
		},

		playNext: function() {
			var unplayed = this.get('unplayed');
			var len = unplayed.get('length');
			var isShuffled = this.get('isShuffled');
			var newTrack;

			// go to a random item from the unplayed items
			if (isShuffled) {
				Ember.debug('shuffling');
				newTrack = unplayed.objectAt(Math.floor(Math.random() * len));
			} else {
				// or go to first
				newTrack = unplayed.get('lastObject');
			}

			if (!newTrack) {
				this.clearHistory();
				return this.send('playFirst');
			}

			this.get('history').pushObject(newTrack);
			this.set('model', newTrack);

			// // if shuffle is on
			// if (this.get('isShuffled')) {
			// 	this.send('playTrack', this.getRandomTrack());
			// 	return;
			// }

			// // if at last track, play first one
			// if (this.get('getCurrentTrackIndex') <= 0) {
			// 	this.send('playFirst');
			// 	return;
			// }

			// var prevTrack = this.get('tracks').objectAt((this.get('getCurrentTrackIndex') - 1));
			// Ember.debug('Playing next track');
			// this.set('model', prevTrack);
		},

		playFirst: function() {
			// first is last because we have newest on top
			var firstTrack = this.get('tracks.lastObject');
			this.get('history').pushObject(firstTrack);
			this.set('model', firstTrack);
			Ember.debug('Playing first track');
		},
		playLast: function() {
			// last is first because we have newest on top
			var lastTrack = this.get('tracks.firstObject');
			this.set('model', lastTrack);
			this.get('history').pushObject(lastTrack);
			Ember.debug('Playing last track');
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
