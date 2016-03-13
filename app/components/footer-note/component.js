import Ember from 'ember';

const {Component} = Ember;

export default Component.extend({
	classNames: ['FooterNote'],

	click() {
		window.scrollTo(0, 0);
	}
});
