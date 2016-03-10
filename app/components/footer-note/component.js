import Ember from 'ember';

const {Component} = Ember;

export default Component.extend({
	className: ['FooterNote'],

	click() {
		window.scrollTo(0, 0);
	}
});
