import Ember from 'ember';

export default Ember.Service.extend({
	isPlaying: false,
	isShuffled: false,
	model: null,

	// we use the tracks fom our model's channel as playlist
	playlist: Ember.computed('model.channel.tracks.[]', function() {
		let playlist = this.get('model.channel.tracks');
		Ember.debug(playlist);
		return playlist;
	}),

	// all listened tracks
	history: Ember.A([]),

	// all tracks not in the history array
	// there is probably a computed macro to handle this.
	unplayed: Ember.computed('history.[]', 'playlist.[]', function() {
		const history = this.get('history');
		const playlist = this.get('playlist');

		if (!playlist) { return; }

		return playlist.filter((track) => {
			return !history.contains(track);
		});
	}),

	// unplayed2: Ember.computed.filter('playlist', function(track, index) {
	// 	return !this.get('history').contains(track);
	// }),

	// Clears history every time the playlist changes
	clearHistory: Ember.observer('playlist', function() {
		Ember.debug('Playlist changed: clearing player history.');
		this.get('history').clear();
	}),

	// If you don't want the URL to change, use this to play a track
	play(track) {
		if (!track) {
			Ember.warn('Play called without a track.');
			return false;
		}

		// the router is injected with the 'player-route' initializer
		this.get('router').transitionTo('track', track);
	},

	// first is last because we have newest on top
	playFirst() {
		let firstTrack = this.get('playlist.lastObject');
		this.play(firstTrack);
		// Ember.debug('Playing first track');
	},

	playLast() {
		// last is first because we have newest on top
		let lastTrack = this.get('playlist.firstObject');
		this.play(lastTrack);
		// Ember.debug('Playing last track');
	},

	prev() {
		const isShuffled = this.get('isShuffled');
		const history = this.get('history');
		const playlist = this.get('playlist');
		const model = this.get('model');
		let newTrack;

		// without shuffle
		if (!isShuffled) {
			// play prev in playlist
			newTrack = playlist.objectAt(playlist.indexOf(model) + 1);

			if (newTrack) {
				this.play(newTrack);
			} else {
				// or play last
				this.playLast();
			}
		}

		// with shuffle
		if (isShuffled) {
			// play prev in history
			newTrack = history.objectAt(history.indexOf(model) - 1);

			if (newTrack) {
				return this.play(newTrack);
			} else {
				// or play prev in playlist
				newTrack = playlist.objectAt(playlist.indexOf(model) + 1);
			}

			if (newTrack) {
				return this.play(newTrack);
			} else {
				// or reset
				// Ember.debug('resetting');
				this.clearHistory();
				return this.set('model', null);
			}
		}
	},

	next() {
		let isShuffled = this.get('isShuffled');
		let model = this.get('model');
		let playlist = this.get('playlist');
		let unplayed = this.get('unplayed');
		let newTrack;

		// define which track is the next track
		if (isShuffled) {

			// go to a random item from the unplayed items
			newTrack = unplayed.objectAt(Math.floor(Math.random() * unplayed.get('length')));
			this.get('history').pushObject(newTrack);
		} else if (model) {

			// or go to next
			newTrack = playlist.objectAt(playlist.indexOf(model) - 1);
		} else {

			// or go to first
			newTrack = unplayed.get('lastObject');
		}

		// play the new track
		if (!newTrack) {
			this.clearHistory();
			this.playFirst();
		} else {
			// Ember.debug(newTrack, 'playback: newTrack');
			this.play(newTrack);
		}
	},

	// gets a random track
	getRandomTrack() {
		let playlist = this.get('playlist');
		let random = Math.floor(Math.random() * playlist.get('length'));
		return playlist.objectAt(random);
	}

	// // not why we need this anymore (probably something with history/shuffle)
	// historyWasUpdated: false,
	// addInitialTrackToHistory: function() {
	// 	let history = this.get('history');
	// 	let historyWasUpdated = this.get('historyWasUpdated');

	// 	Ember.debug('addToHistory: model changed');

	// 	if (historyWasUpdated) { return; }

	// 	history.pushObject(this.get('model'));
	// 	this.set('historyWasUpdated', true);
	// },

	// // Generates a ytid if the model doesn't have one already
	// // @todo: this should be removed when all tracks have an ytid
	// tryUpdateProvider: function() {
	// 	Ember.debug('validateTrack');

	// 	if (!this.get('model')) {
	// 		return;
	// 	}

	// 	if (!this.get('model.ytid')) {
	// 		this.get('model').updateProvider();
	// 	}
	// },

	// modelChanged: Ember.observer('session.currentUser.settings.trackForRemote', function() {
	// 	let session = this.get('session');
	//
	// 	Ember.debug('player model changed');
	// 	Ember.debug(session);
	//
	// 	let user = this.get('session.currentUser');
	// 	Ember.debug(user);
	//
	// 	let settings = user.get('settings');
	// 	Ember.debug(settings);
	//
	// 	// settings.then((s) => {
	// 	// 	s.set('trackForRemote', this.get('model'));
	// 	// 	s.save().then(() => {
	// 	// 		Ember.debug('saved settings with track');
	// 	// 	});
	// 	// });
	//
	//
	// 	// Ember.run.schedule('sync', () => {
	// 	// 	this.addInitialTrackToHistory();
	// 	// 	this.tryUpdateProvider();
	// 	// });
	//
	// 	// if (!settings.get('remoteActive')) { return; }
	//
	//
	// }),
});
