import Ember from 'ember';

export default Ember.Component.extend({
	classNames: ['Cover'],
	actions: {
		play() {
			this.transitionToRoute('track', this.get('model.tracks.lastObject'));
		},
		pause() {
			this.get('playback.player').send('pause');
		}
	}
});
