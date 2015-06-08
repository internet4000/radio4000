import Ember from 'ember';

const { computed, debug, observer } = Ember;

export default Ember.Service.extend({
	isPlaying: false,
	isShuffled: false,
	model: null,
	playlist: null,

	setPlaylist: observer('model.channel.tracks', function() {
		let playlist = this.get('playlist');
		let newPlaylist = this.get('model.channel.tracks');

		// if it's a new playlist, set it and clear history (for shuffle)
		if (!Ember.isEqual(playlist, newPlaylist)) {
			debug('setting new playlist');
			this.set('playlist', newPlaylist);
			this.get('history').clear();
		}
	}),

	// all listened tracks
	history: Ember.A([]),

	// all tracks not in the history array
	// there is probably a computed macro to handle this.
	unplayed: computed('history.[]', 'playlist.[]', function() {
		const history = this.get('history');
		const playlist = this.get('playlist');

		if (!playlist) { return; }

		return playlist.filter((track) => {
			return !history.contains(track);
		});
	}),

	// unplayed2: computed.filter('playlist', function(track, index) {
	// 	return !this.get('history').contains(track);
	// }),

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
		// debug('Playing first track');
	},

	playLast() {
		// last is first because we have newest on top
		let lastTrack = this.get('playlist.firstObject');
		this.play(lastTrack);
		// debug('Playing last track');
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
				// debug('resetting');
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
			// debug(newTrack, 'playback: newTrack');
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

	// 	debug('addToHistory: model changed');

	// 	if (historyWasUpdated) { return; }

	// 	history.pushObject(this.get('model'));
	// 	this.set('historyWasUpdated', true);
	// },

	// // Generates a ytid if the model doesn't have one already
	// // @todo: this should be removed when all tracks have an ytid
	// tryUpdateProvider: function() {
	// 	debug('validateTrack');

	// 	if (!this.get('model')) {
	// 		return;
	// 	}

	// 	if (!this.get('model.ytid')) {
	// 		this.get('model').updateProvider();
	// 	}
	// },
});
