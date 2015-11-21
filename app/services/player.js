import Ember from 'ember';

const {debug, observer, inject} = Ember;

export default Ember.Service.extend({
	playerRandom: inject.service(),
	userHistory: inject.service(),
	isPlaying: false,
	isLooped: true,
	model: null,
	playlist: null,

	// this caches the current playlist and sets it
	// if it really did change (through the model)
	setPlaylist: observer('model.channel.tracks', function () {
		let playlistId = this.get('playlist.id');

		this.get('model.channel').then(newPlaylist => {
			let newPlaylistId = newPlaylist.get('id');

			if (Ember.isEqual(playlistId, newPlaylistId)) {
				debug('Playlist already set.');
				return false;
			}
			this.set('playlist', newPlaylist);
			debug('Playlist was set');
		});
	}),

	/**
		Application route called this.
		A track from the player ended, without user action. Tt played naturally untill the end
	*/
	trackEnded() {
		// ui: @TODO refactor playerIsInLoadingState
		this.set('isPlaying', false);
		// whatever the case, add the radio to userHistory
		this.get('userHistory').didPlayChannel();
		// play next track
		return this.next();
	},
	clearPlayedTracksStatus() {
		debug('clearPlayedTracksStatus started');
		this.get('playlist.tracks').then(tracks => {
			tracks.forEach(track => {
				track.set('usedInCurrentPlayer', false);
			});
		});
	},

	// If you don't want the URL to change, use this to play a track
	play(track) {
		if (!track) {
			Ember.warn('Play called without a track.');
			return false;
		}
		this.get('userHistory').setTrackHasPlayed(track);
		track.set('usedInCurrentPlayer', true);
		// the router is injected with the 'player-route' initializer
		// this.get('router').transitionTo('track', track);
		this.set('model', track);
		this.set('isPlaying', true);
	},

	// Plays a random track from the playlist array
	playShuffleFromTracks(tracks) {
		this.set('playerRandom.isRandom', true);
		this.play(this.getRandom(tracks));
	},

	pause() {
		this.set('isPlaying', false);
	},

	// plays the previous track and stays at first
	prev() {
		const playlist = this.get('playlist');
		const history = this.get('randomHistory');
		const isRandom = this.get('playerRandom.isRandom');
		let prev = this.getNext();

		// without shuffle
		if (!isRandom) {
			if (!prev) {
				return this.play(playlist.get('firstObject'));
			}

			return this.play(prev);
		}

		if (isRandom) {
			// when there are no more tracks to go back to
			// we stop playback and reset the history
			if (Ember.isEmpty(history)) {
				debug('resetting');
				this.refreshRandomPool();
				return false;
			}

			prev = this.getPrev(history);
			return this.play(prev);
		}
	},

	// decide which next track is going to play, depending on the play mode
	next() {
		const isRandom = this.get('playerRandom.isRandom');

		if (isRandom) {
			return this.nextRandom();
		}
		return this.nextNormal();
	},

	// which track to play when in normal mode (no random)
	nextNormal() {
		debug('nextNormal started');
		const playlist = this.get('playlist');
		let next = this.getPrev();

		if (!next) {
			// first is last because we have newest on top
			return this.play(playlist.get('tracks.lastObject'));
		}

		return this.play(next);
	},

	// which track to play when player is in random mode
	nextRandom() {
		debug('nextRandom started');
		let nextRandom = this.get('playerRandom').getRandom();
		return this.play(nextRandom);
	},

	getPrev(array = this.get('playlist.tracks')) {
		return array.objectAt(array.indexOf(this.get('model')) - 1);
	},

	getNext(array = this.get('playlist.tracks')) {
		return array.objectAt(array.indexOf(this.get('model')) + 1);
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
