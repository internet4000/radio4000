import Ember from 'ember';

export default Ember.Component.extend({
	classNames: ['PlayPause'],

	actions: {
		togglePlayback() {
			// this.sendAction('togglePlay')
			if (this.get('isPlaying')) {
				this.sendAction('pause');
			} else {
				this.sendAction('play');
			}
		}
	}
});
