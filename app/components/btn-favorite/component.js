import Ember from 'ember';

export default Ember.Component.extend({
	classNameBindings: ['value:is-favorite'],
	classNames: ['Btn'],
	tagName: 'button',

	click() {
		this.sendAction(); // triggers the action specified on the component markup
	}
});
