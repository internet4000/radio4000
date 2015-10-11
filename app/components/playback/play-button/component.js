import Ember from 'ember';

/**
 * @function (track)
 * sends plays with the oldest track
 * reverses the channel array so it keeps going from the oldest
 * @param reverse:bool
 **/

export default Ember.Component.extend({
	tagName: 'button',
	classNames: ['Btn'],

	player: Ember.inject.service(''),

	click() {
		let track = this.get('track');
		let shuffle = this.get('shuffle');

		if (shuffle) {
			this.get('player').playShuffle(track);
			return;
		}

		this.get('player').play(track);
	}
});
