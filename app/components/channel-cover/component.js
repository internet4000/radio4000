import Ember from 'ember';

export default Ember.Component.extend({
	tagName: 'figure',
	classNames: ['Cover'],
	canPlay: false,

	actions: {
		play() {
			this.sendAction('onPlay');
		}
	}
});
