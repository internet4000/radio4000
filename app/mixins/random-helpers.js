import Ember from 'ember';

const {Mixin} = Ember;

export default Mixin.create({

	randomNumberInArray(arrayLength) {
		return Math.floor(Math.random() * arrayLength);
	}

});
