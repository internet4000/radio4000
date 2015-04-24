import Ember from 'ember';

export default Ember.Component.extend({
	classNames: ['Cover'],
	hideTitle: false,
	hideLink: false,
	actions: {
		play() {
			this.transitionToRoute('track', this.get('model.tracks.lastObject'));
		},
		pause() {
			this.get('playback.player').send('pause');
		}
	}
});
