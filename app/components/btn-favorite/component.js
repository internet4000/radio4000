import Ember from 'ember';

const {Component, computed, get} = Ember;

export default Component.extend({
	tagName: 'button',
	classNames: ['Btn'],
	attributeBindings: ['title', 'disabled'],
	disabled: computed.not('isIdle'),
	title: computed('isFavorite', {
		get() {
			if (!get(this, 'isFavorite')) {
				return 'Save this radio to your favorites';
			}
			return 'Remove this radio from your favorites';
		}
	}),
	click() {
		if (get(this, 'onClick')) {
			get(this, 'onClick')();
		}
	}
});
