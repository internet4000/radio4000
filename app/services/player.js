import Ember from 'ember';

const {A, computed, debug, observer, inject} = Ember;

export default Ember.Service.extend({
	playerRandom: inject.service(),
	userHistory: inject.service(),
	isPlaying: false,
	// isShuffling: false,
	isLooped: true,
	model: null,
	playlist: null,

	// this caches the current playlist and sets it
	// if it really did change (through the model)
	setPlaylist: observer('model.channel.tracks', function () {
		let playlist = this.get('playlist');
		let newPlaylist = this.get('model.channel.tracks');

		if (Ember.isEqual(playlist, newPlaylist)) {
			debug('Playlist already set.');
			return false;
		}

		debug('setting new playlist');
		this.set('playlist', newPlaylist);
		this.clearHistory();
	}),

	// all listened tracks
	history: new A([]),

	// all playlist items not in the history array
	unplayed: computed.filter('playlist', function (item) {
		return !this.get('history').contains(item);
	}),

	// a track from the player ended (no user action, it played all the track)
	trackEnded() {
		// ui
		// @TODO refactor playerIsInLoadingState
		this.set('isPlaying', false);

		// if random, nextRandom
		if (!this.get('playerRandom.isShuffling')) {
			this.nextRandom();
			this.get('userHistory').trackEnded(this.get('player.model.channel'));
		}
		// if normal play next mode
		this.next();
	},

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

	// Plays a random track from the playlist array
	playShuffleFromTracks(tracks) {
		this.set('playerRandom.isShuffling', true);
		this.play(this.getRandom(tracks));
	},

	pause() {
		this.set('isPlaying', false);
	},

	// plays the previous track and stays at first
	prev() {
		const playlist = this.get('playlist');
		const history = this.get('history');

		let prev = this.getNext();

		// without shuffle
		if (!isShuffling) {
			if (!prev) {
				return this.play(playlist.get('firstObject'));
			}

			return this.play(prev);
		}

		if (isShuffling) {
			// when there are no more tracks to go back to
			// we stop playback and reset the history
			if (Ember.isEmpty(history)) {
				debug('resetting');
				this.clearHistory();
				return false;
			}

			prev = this.getPrev(history);
			return this.play(prev);
		}
	},

	// plays the next track
	next() {
		const isShuffling = this.get('playerRandom.isShuffling');

		if (isShuffling) {
			return this.nextRandom();
		}
		return this.nextNormal();
	},

	// which track to play when in normal mode (no random)
	nextNormal() {
		const playlist = this.get('playlist');
		let next = this.getPrev();

		if (!next) {
			this.clearHistory();

			// first is last because we have newest on top
			return this.play(playlist.get('lastObject'));
		}

		return this.play(next);
	},

	// which track to play when player is in random mode
	nextRandom() {
		let nextRandom = this.getRandom();

		if (!nextRandom) {
			this.clearHistory();
			nextRandom = this.getRandom();
		}

		this.get('history').pushObject(nextRandom);
		return this.play(nextRandom);
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
	},

	// On YouTube player error
	onError(error) {
		this.set('isPlaying', false);

		debug(error);

		// dont do anything on 'invalid parameter'
		if (error === 2) {
			return;
		}

		// dont do anything on 'invalid parameter'
		if (error === 150) {
			// @TODO mark track as georestricted
		}

		// otherwise play next
		this.get('player').next();
	}
});
