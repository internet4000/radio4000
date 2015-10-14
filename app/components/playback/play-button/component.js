import Ember from 'ember';

/**
 * @function
 * @param {object: track model}
 * @param  {bool} shuffle
 * sends plays with a track
 **/

export default Ember.Component.extend({
	tagName: 'button',
	classNames: ['Btn'],
	player: Ember.inject.service(''),

	click() {
		let player = this.get('player');
		// get the track passed as argument
		let track = this.get('track');
		// see if there is a play method
		let shuffle = this.get('shuffle');
		if (shuffle) {
			player.playShuffle(track);
			return;
		}
		player.play(track);
	}
});
