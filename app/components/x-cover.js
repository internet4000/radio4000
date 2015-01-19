import Ember from 'ember';

export default Ember.Component.extend({
	classNames: ['Cover'],
	actions: {
		play: function() {
			this.transitionToRoute('track', this.get('model.tracks.lastObject'));
		},
		pause: function() {
			this.get('playback.player').send('pause');
		}
	}
});
