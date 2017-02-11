import Ember from 'ember';

const {Component, get} = Ember;

// setKey (key:string, toggle:boolean)

export default Component.extend({
	tagName: ['Button'],
	classNames: ['Btn'],
	toggle: false,
	click() {
		get(this, 'setKey')();
	}
});
