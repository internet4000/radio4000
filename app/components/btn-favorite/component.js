import Ember from 'ember';

export default Ember.Component.extend({
	tagName: 'span',
	classNameBindings: ['isFavorite'],

	click() {
		// triggers the action specified on the component markup on the parent controller
		this.sendAction();
	}
});
