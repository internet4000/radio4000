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
		let track = this.get('track');
		let channel = this.get('channel');
		let shuffle = this.get('shuffle');

		if (channel) {
			this.set('isLoading', true);
			channel.get('tracks').then(tracks => {
				this.set('isLoading', false);
				return player.play(tracks.get('lastObject'));
			});
		}

		if (shuffle) {
			player.playShuffle(track);
			return;
		}

		player.play(track);
	}
});
