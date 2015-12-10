import Ember from 'ember';
import randomHelpers from 'radio4000/mixins/random-helpers';

const {Service, A, inject, observer, debug} = Ember;

export default Service.extend(randomHelpers, {
	player: inject.service(),
	isRandom: false,

	// Pool of shuffled tracks: those availabled to be picked form
	randomPool: [],
	// which one are we currently playing
	randomIndex: 0,

	// random was activated
	// - from clicking on shuffle in playback
	// - @TODO from shuffling on a channel card
	randomWasActivated: observer('isRandom', 'player.playlist.model', function () {
		if (this.get('isRandom')) {
			// 1- visualy clear played tracks in the current channel
			this.get('player').clearPlayedTracksStatus();
			// 2- set pool of tracks to be used
			debug('randomWasActivated: new channel to random');
			this.setNewRandomPool();
		}
	}),
	// sets a new random pool from the playlist in the player
	// takes the player array and shuffles it
	setNewRandomPool() {
		let shuffledItems = [];
		this.get('player.playlist.tracks').then(items => {
			items.forEach(item => {
				shuffledItems.pushObject(item);
			});
			this.set('randomPool', this.shuffle(shuffledItems));
		});
	},
	// manages what to do when random has to be refreshed/reset
	refreshRandom() {
		debug('refreshRandomPool started');
		// @TODO clear all tracks.usedInCurrentPlayer
		this.get('player').clearPlayedTracksStatus();
		this.setNewRandomPool();
	},
	randomPoolIsEmpty() {
		this.set('randomIndex', 0);
	},

	/**
	 @method
	 @returns @track model that has to be played, to the player@nextRandom
	 @param {pool} array of tracks available to be played
	*/
	getNext() {
		let index = this.get('randomIndex');
		let pool = this.get('randomPool');
		console.log(pool);
		// increment index to select the next one
		console.log(index);
		index++;
		console.log(index);

		this.set('randomIndex', index);
		// if there are next track available
		if (index <= pool.length) {
			let track = pool[index];
			return track;
		}
		// if no next, play first track in shuffle
		// and reset random index
		this.randomPoolIsEmpty();
		let track = pool[0];
		return track;
	},

	/**
		@method getPrevious
		@returns the track previously played in random mode
	*/
	getPrevious() {
		let index = this.get('randomIndex');
		let pool = this.get('randomPool');
		this.set('randomIndex', index - 1);

		return pool[index - 1];
	}
});
