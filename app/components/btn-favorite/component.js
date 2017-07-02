import Ember from 'ember';

const {Component, computed, get} = Ember;

export default Component.extend({
	tagName: 'button',
	classNames: ['Btn Btn--small'],
	attributeBindings: ['title'],

	title: computed('isFavorite', {
		get() {
			if (!get(this, 'isFavorite')) {
				return 'Remove this radio from your favorites';
			}
			return 'Save this radio to your favorites';
		}
	}),

	click() {
		if (get(this, 'onClick')) {
			get(this, 'onClick')();
		}
	}
});
