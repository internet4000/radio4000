import Ember from 'ember';
import {shuffleArray} from 'radio4000/utils/random-helpers';

const {Service, RSVP, inject, debug} = Ember;

export default Service.extend({
	player: inject.service(),

	// Pool of shuffled tracks: those availabled to be picked form
	randomPool: [],

	// Copies and shuffles a 'channel.tracks' array and sets it as the random pool.
	setNewRandomPool(tracks) {
		debug('setNewRandomPool');
		let pool = [];
		tracks.forEach(track => {
			pool.pushObject(track);
		});
		pool = shuffleArray(pool);
		this.set('randomPool', pool);
	},

	/**
	 @method
	 @returns @promise {track} model that has to be played, to the player@nextRandom
	 promise so it waits there is a track found to play it
	 */
	getNext() {
		const array = this.get('randomPool');
		const currentIndex = array.indexOf(this.get('player.model'));

		return new RSVP.Promise(resolve => {
			let item = array.objectAt(currentIndex + 1);
			if (!item) {
				item = array.objectAt(0);
			}
			resolve(item);
		});
	},

	/**
		@method getPrevious
		@returns the track previously played in random mode
		*/
	getPrevious() {
		const array = this.get('randomPool');
		const currentIndex = array.indexOf(this.get('player.model'));

		return new RSVP.Promise(resolve => {
			let item = array.objectAt(currentIndex - 1);
			if (!item) {
				item = array.objectAt(array.length - 1);
			}
			resolve(item);
		});
	}
});
