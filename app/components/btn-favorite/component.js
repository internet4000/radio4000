import Ember from 'ember';

const {Component, computed, get} = Ember;

export default Component.extend({
	tagName: 'button',
	classNames: ['Btn Btn--small'],
	attributeBindings: ['title'],

	title: computed('isFavorite', {
		get() {
			const isFavorite = get(this, 'isFavorite');
			if (!isFavorite) {
				return 'Remove this radio from your favorites';
			}
			return 'Save this radio to your favorites';
		}
	}),

	// triggers the action specified on the component markup on the parent controller
	click() {
		this.sendAction();
	}
});
