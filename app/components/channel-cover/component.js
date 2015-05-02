import Ember from 'ember';

export default Ember.Component.extend({
	classNames: ['Cover'],
	hideTitle: false,
	hideLink: false,
	actions: {
		play() {
			this.sendAction('play');
		}
		// ,pause() {
		// 	this.get('playback.player').send('pause');
		// }
	}
});
