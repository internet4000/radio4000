import Ember from 'ember';
import randomHelpers from 'radio4000/mixins/random-helpers';

const {Service, A, inject, computed, observer, debug} = Ember;

export default Service.extend(randomHelpers, {
	player: inject.service(),
	isRandom: false,

	// Pool of available = all track we did not listen to
	randomPool: new A([]),
	randomHistory: new A([]),

	// random was activated
	// - from clicking on shuffle in playback
	// - @TODO from shuffling on a channel card
	randomWasActivated: observer('isRandom', 'player.playlist.model', function () {
		// 1- visualy clear played tracks in the current channel
		this.get('player').clearPlayedTracksStatus();
		// 2- set pool of tracks to be used
		if (this.get('isRandom')) {
			debug('randomWasActivated: new channel to random');
			this.setRandomPool();
		}
	}),
	// sets a new random pool from the playlist in the player
	setRandomPool() {
		// get track list from player
		let array = this.get('player.playlist.tracks');
		// clean randomHistory by setting it to an empty array
		// set them has available pool
		this.set('randomHistory', []);
		this.set('randomPool', array.slice(0));
	},
	// manages what to do when random has to be refreshed/reset
	refreshRandom() {
		debug('refreshRandomPool started');
		// @TODO clear all tracks.usedInCurrentPlayer
		this.get('player').clearPlayedTracksStatus();
		this.setRandomPool();
	},

	/**
	 @method
	 @returns @track model that has to be played, to the player@nextRandom
	 @param {pool} array of tracks available to be played
	*/
	getRandom(pool = this.get('randomPool')) {
		debug('getRandom started');

		// get random number to get random track
		let poolLength = pool.get('length');

		// if no object in pool, refresh it
		if (!poolLength) {
			debug('pool is empty!');
			this.refreshRandom();
			return this.getRandom();
		}

		// otherwise, find a random track in the pool and return it to nextRandom
		let randomNumberInPool = this.randomNumberInArray(poolLength);
		let randomTrackInPool = pool.objectAt(randomNumberInPool);

		console.log('- poolLength:', poolLength, 'randomNumberInPool:', randomNumberInPool);

		// update the pool, and history
		this.get('randomPool').removeObject(randomTrackInPool);
		this.get('randomPool').addObject(randomTrackInPool);

		return randomTrackInPool;
	},

	/**
		@method getPrevious
		@returns the track previously played in random mode
	*/
	getPrevious() {
		let item = this.get('randomHistory');
		console.log('randomHistory: ', item);
		return item;
	}
});
