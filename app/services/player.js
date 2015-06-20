import Ember from 'ember';

const { computed, debug, observer } = Ember;

export default Ember.Service.extend({
	isPlaying: false,
	isShuffled: false,
	isLooped: true,
	model: null,
	playlist: null,

	// this caches the current playlist and sets it
	// if it really did change (through the model)
	setPlaylist: observer('model.channel.tracks', function() {
		let playlist = this.get('playlist');
		let newPlaylist = this.get('model.channel.tracks');

		if (!Ember.isEqual(playlist, newPlaylist)) {

			debug('setting new playlist');
			this.set('playlist', newPlaylist);
			this.clearHistory(); // for shuffle
		}
	}),

	// all listened tracks
	history: Ember.A([]),

	// all playlist items not in the history array
	unplayed: computed.filter('playlist', function(item) {
		return !this.get('history').contains(item);
	}),

	// If you don't want the URL to change, use this to play a track
	play(track) {
		if (!track) {
			Ember.warn('Play called without a track.');
			return false;
		}

		// the router is injected with the 'player-route' initializer
		// this.get('router').transitionTo('track', track);
		this.set('model', track);
	},

	// plays the previous track and stays at first
	prev() {
		const playlist = this.get('playlist');
		const history = this.get('history');
		const isShuffled = this.get('isShuffled');
		let prev = this.getNext();

		// without shuffle
		if (!isShuffled) {
			if (prev) {
				return this.play(prev);
			} else {
				return this.play(playlist.get('firstObject'));
			}
		}

		// with shuffle
		if (isShuffled) {

			// when there's no more tracks to go back to
			// we have to do nothing
			if (Ember.isEmpty(history)) {
				debug('resetting');
				this.clearHistory();
				return;
			}

			prev = this.getPrev(history);
			return this.play(prev);
		}
	},

	// plays the next track
	next() {
		const playlist = this.get('playlist');
		const isShuffled = this.get('isShuffled');
		let next = this.getPrev();

		if (isShuffled) {
			let nextRandom = this.getRandom();

			if (!nextRandom) {
					this.clearHistory();
					nextRandom = this.getRandom();
			}

			this.get('history').pushObject(nextRandom);
			return this.play(nextRandom);
		}

		if (!next) {
			this.clearHistory();
			return this.play(playlist.get('lastObject')); // first is last because we have newest on top
		}

		return this.play(next);
	},

	// gets a random track
	getRandom(array = this.get('unplayed')) {
		let random = Math.floor(Math.random() * array.get('length'));
		return array.objectAt(random);
	},

	getPrev(array = this.get('playlist')) {
		return array.objectAt(array.indexOf(this.get('model')) - 1);
	},

	getNext(array = this.get('playlist')) {
		return array.objectAt(array.indexOf(this.get('model')) + 1);
	},

	clearHistory() {
		let history = this.get('history');
		Ember.debug('Player history was cleared');
		history.clear();
	}
});
