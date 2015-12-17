import Ember from 'ember';
import randomHelpers from 'radio4000/mixins/random-helpers';

const {Service, inject, debug, computed} = Ember;

export default Service.extend(randomHelpers, {
	player: inject.service(),

	// Pool of shuffled tracks: those availabled to be picked form
	randomPool: [],

	// sets a new random pool from the playlist in the player
	// takes the player array and shuffles it
	setNewRandomPool(items) {
		debug('setNewRandomPool');
		let shuffledItems = [];
		items.forEach(item => {
			shuffledItems.pushObject(item);
		});
		this.set('randomPool', this.shuffle(shuffledItems));
	},

	/**
	 @method
	 @returns @promise {track} model that has to be played, to the player@nextRandom
	 promise so it waits there is a track found to play it
	*/
	getNext() {
		let array = this.get('randomPool');
		return new Promise(resolve => {
			let item = array.objectAt(array.indexOf(this.get('player.model')) + 1);
			if (!item) {
				resolve(array.objectAt(0));
			}
			resolve(item);
		});
	},

	/**
		@method getPrevious
		@returns the track previously played in random mode
	*/
	getPrevious() {
		let array = this.get('randomPool');
		return new Promise(resolve => {
			let item = array.objectAt(array.indexOf(this.get('player.model')) - 1);
			if (!item) {
				resolve(array.objectAt(array.length - 1));
			}
			resolve(item);
		});
	}
});
