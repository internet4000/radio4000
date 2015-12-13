import Ember from 'ember';

const {debug, observer, inject, warn} = Ember;

export default Ember.Service.extend({
	playerRandom: inject.service(),
	playerHistory: inject.service(),
	isPlaying: false,
	isLooped: true,
	isRandom: false,
	model: null,
	playlist: null,

	// this caches the current playlist and sets it
	// if it really did change (through the model)
	setPlaylist() {
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
	},

	play() {
		this.set('isPlaying', true);
		this.get('playerHistory').setTrackAsPlayed();
	},
	pause() {
		this.set('isPlaying', false);
	},

	/**
	Plays a track
	Give it a track, and he'll know what to do with it
	*/
	playTrack(track) {
		if (!track) {
			warn('Play called without a track.');
			return false;
		}
		// the router is injected with the 'player-route' initializer
		// this.get('router').transitionTo('track', track);
		this.setProperties({
			model: track,
			isPlaying: true
		});
		this.setPlaylist();
	},

	/**
		prev
		decides which track to play
		depends on the active play mode
	*/
	prev() {
		const isRandom = this.get('isRandom');

		if (isRandom) {
			return this.prevRandom();
		}
		return this.prevNormal();
	},
	prevNormal() {
		const playlist = this.get('playlist');
		let prev = this.getPrev();

		if (!prev) {
			this.get('playerHistory').clearPlayerHistory();
			// first is last because we have newest on top
			return this.playTrack(playlist.get('tracks.firstObject'));
		}

		return this.playTrack(prev);
	},
	prevRandom() {
		let prev = this.get('playerRandom').getPrevious();
		return this.playTrack(prev);
	},

	/**
		next
		decide which next track is going to play
		depends on the active play mode
	*/
	next() {
		const isRandom = this.get('isRandom');
		if (isRandom) {
			return this.nextRandom();
		}
		return this.nextNormal();
	},
	nextNormal() {
		const playlist = this.get('playlist');
		let next = this.getNext();

		if (!next) {
			this.get('playerHistory').clearPlayerHistory();
			// first is last because we have newest on top
			return this.playTrack(playlist.get('tracks.lastObject'));
		}

		return this.playTrack(next);
	},
	nextRandom() {
		let nextRandom = this.get('playerRandom').getNext();
		return this.playTrack(nextRandom);
	},

	// Find out which actual item has to be played
	getNext(array = this.get('playlist.tracks')) {
		return array.objectAt(array.indexOf(this.get('model')) - 1);
	},

	getPrev(array = this.get('playlist.tracks')) {
		return array.objectAt(array.indexOf(this.get('model')) + 1);
	},

	/**
		On YouTube player error
	*/
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
	},

	/**
		Random was activated
		from clicking on shuffle in playback
		@TODO from shuffling on a channel card
	 */
	randomWasActivated: observer('isRandom', 'playlist.model', function () {
		if (this.get('isRandom')) {
			debug('randomWasActivated');
			// 1- visualy clear played tracks in the current channel
			this.get('playerHistory').clearPlayerHistory();
			// 2- set pool of tracks to be used
			this.get('playlist.tracks').then(items => {
				this.get('playerRandom').setNewRandomPool(items);
			});
		}
	}),
	randomEnded() {
		debug('player.randomEnded');
		this.get('playlist.tracks').then(items => {
			let item = items.slice(0, 1)[0];
			console.log(item);
			this.playTrack(item);
		});
	},

	/**
		A track ended naturally
		Application route called this.
		A track from the player ended, without user action. It played naturally untill the end
	*/
	trackEnded(finishedTrack = this.get('model')) {
		this.set('isPlaying', false);
		// mark this track has finished
		this.get('playerHistory').trackEnded(finishedTrack);
		// play next track
		return this.next();
	}
});
