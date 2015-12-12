import Ember from 'ember';
import randomHelpers from 'radio4000/mixins/random-helpers';

const {Service, inject, computed, debug} = Ember;

export default Service.extend(randomHelpers, {
	player: inject.service(),

	// Pool of shuffled tracks: those availabled to be picked form
	randomPool: [],
	// which one are we currently playing
	randomIndex: 0,
	canPrevious: computed.bool('randomIndex'),

	// sets a new random pool from the playlist in the player
	// takes the player array and shuffles it
	setNewRandomPool(items) {
		let shuffledItems = [];
		items.forEach(item => {
			shuffledItems.pushObject(item);
		});
		this.set('randomPool', this.shuffle(shuffledItems));
	},

	// manages what to do when random has to be refreshed/reset
	refreshRandom() {
		debug('refreshRandomPool started');
		// @TODO clear all tracks.usedInCurrentPlayer
		this.get('player').clearPlayerHistory();
		this.setNewRandomPool();
	},
	shuffleSequenceIsFinished() {
		debug('shuffleSequenceIsFinished');
		this.get('player').randomEnded();
	},

	/**
	 @method
	 @returns @track model that has to be played, to the player@nextRandom
	 @param {pool} array of tracks available to be played
	*/
	getNext() {
		let index = this.get('randomIndex');
		let pool = this.get('randomPool');
		// increment index to select the next one
		index++;
		this.set('randomIndex', index);

		// if there are next track available
		// note that index starts at 0, and .length at 1
		if (index <= pool.length) {
			let track = pool[index];
			return track;
		}
		this.shuffleSequenceIsFinished();
	},

	/**
		@method getPrevious
		@returns the track previously played in random mode
	*/
	getPrevious() {
		let index = this.get('randomIndex');
		let pool = this.get('randomPool');
		// decrement index
		index--;
		this.set('randomIndex', index);

		// if there are no more tracks previous
		if (index >= 0) {
			// normal take the previous track
			return pool[index];
		}
		// else reset random to a new random
		this.shuffleSequenceIsFinished();
	}
});
