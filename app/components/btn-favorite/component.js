import Ember from 'ember';

export default Ember.Component.extend({
	tagName: 'button',
	classNameBindings: ['isFavorite'],
	attributeBindings: ['title'],

	// triggers the action specified on the component markup on the parent controller
	click() {
		this.sendAction();
	}
});
