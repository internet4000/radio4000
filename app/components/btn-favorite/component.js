import Ember from 'ember';

export default Ember.Component.extend({
	classNameBindings: ['value:is-favorite'],
	classNames: ['ToogleFavorite'],
	tagName: 'span',

	click() {
		this.sendAction(); // triggers the action specified on the component markup, in the parent controller
	}
});
