import Ember from 'ember';

const {Component, get} = Ember;

export default Component.extend({
	tagName: ['Button'],
	classNames: ['Btn'],
	toggle: false,
	click() {
		// NOTE: the key is automatically passed as 1st argument
		// here toggle is the second param to parent component action
		get(this, 'setKey')(get(this, 'toggle'));
	}
});
