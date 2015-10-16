import Ember from 'ember';

/**
 * @function
 * @param {object: track model}
 * @param  {bool} shuffle
 * sends plays with a track
 **/

export default Ember.Component.extend({
	player: Ember.inject.service(),
	tagName: 'button',
	classNames: ['Btn'],
	classNameBindings: ['isLoading'],

	click() {
		let player = this.get('player');
		let track = this.get('track');
		let channel = this.get('channel');
		let shuffle = this.get('shuffle');

		if (track) {
			return player.play(track);
		}

		this.set('isLoading', true);

		Ember.run.scheduleOnce('afterRender', this, function () {
			channel.get('tracks').then(tracks => {
				this.set('isLoading', false);

				if (shuffle) {
					return player.playShuffleFromTracks(tracks);
				}

				return player.play(tracks.get('lastObject'));
			});
		});
	}
});
