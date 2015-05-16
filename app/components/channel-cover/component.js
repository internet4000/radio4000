import Ember from 'ember';

export default Ember.Component.extend({
	classNames: ['Cover'],
	hideTitle: false,
	hideLink: false,
	hideControls: false,
	actions: {
		play() {
			this.sendAction('play');
		}
	}
});
