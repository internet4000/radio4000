import Ember from 'ember';
import {shuffleArray} from 'radio4000/utils/random-helpers';

const {Service, inject, debug, RSVP} = Ember;

export default Service.extend({
	player: inject.service(),

	// Pool of shuffled tracks: those availabled to be picked form
	randomPool: [],

	// Copies and shuffles a 'channel.tracks' array and sets it as the random pool.
	// Note: this is A BIT heavy, so we should avoid calling it more than necessary.
	setNewRandomPool(tracks) {
		debug('setNewRandomPool');
		let pool = [];
		tracks.forEach(track => {
			pool.pushObject(track);
		});
		pool = shuffleArray(pool);
		this.set('randomPool', pool);
	},

	// Returns a promise with the next track in the random pool
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

	// Returns a promise with the track previously played while player.isRandom was enabled
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
