import Ember from 'ember';

export default Ember.Component.extend({
	tagName: 'figure',
	classNames: ['Cover'],
	classNameBindings: ['isCard:Cover--card'],
	isCard: false,
	hideTitle: false,
	hideLink: false,
	hideControls: false,
	actions: {
		play() {
			this.sendAction('play');
		}
	}
});
