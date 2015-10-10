import Ember from 'ember';

/**
 * @function (track.lastObject)
 * sends plays with the oldest track
 * reverses the channel array so it keeps going from the oldest
 **/

export default Ember.Component.extend({
	classNames: ['PlaybackExternal'],
	player: Ember.inject.service(''),
	actions: {
		play() {
			let track = this.get('track');
			this.get('player').play(track).reverseChannel();
		}
	}
});
