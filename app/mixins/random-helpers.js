import Ember from 'ember';

const {Mixin} = Ember;

export default Mixin.create({

	randomNumberInArray(arrayLength) {
		return Math.floor(Math.random() * arrayLength);
	},

	// takes an array and returns it shuffled
	// http://bost.ocks.org/mike/shuffle/
	shuffle(array) {
		let m = array.length;
		let t;
		let i;

		// While there remain elements to shuffle…
		while (m) {
			// Pick a remaining element…
			i = Math.floor(Math.random() * m--);

			// And swap it with the current element.
			t = array[m];
			array[m] = array[i];
			array[i] = t;
		}
		return array;
	}
});
