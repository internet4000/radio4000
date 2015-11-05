import Ember from 'ember';

const {Component} = Ember;

export default Component.extend({
	tagName: 'a',
	href: '#',
	track: null,
	attributeBindings: ['href'],

	click(event) {
		event.preventDefault();
		console.log('clicked');
		this.get('on-click')();
	}
 });
