import Ember from 'ember';

export default Ember.Component.extend({
	classNames: ['PlaybackExternal'], 
	player: Ember.inject.service(''),
	actions: {
		play() {
			let track = this.get('track');
			this.get('player').play(track);
		}
	}
});
