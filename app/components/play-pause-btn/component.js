import Ember from 'ember';

export default Ember.Component.extend({
	tagName: ['button'],
	classNames: ['PlayPause'],
	isPlaying: false,

	click() {
		if (this.get('isPlaying')) {
			this.sendAction('pause');
		} else {
			this.sendAction('play');
		}
	}
});
