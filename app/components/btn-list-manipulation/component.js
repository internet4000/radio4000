import Ember from 'ember';

const {Component, computed, get} = Ember;

export default Component.extend({
	tagName: ['Button'],
	classNames: ['Btn', 'Btn--small'],
	attributeBindings: ['title'],
	toggle: false,
	// text: '',
	// title: false,

	title: computed('text', {
		get() {
			const text = get(this, 'text')
			if (text) {
				return `Sort by ${text}`
			}
			return false
		}
	}),

	click() {
		get(this, 'onClick')();
	}
});
