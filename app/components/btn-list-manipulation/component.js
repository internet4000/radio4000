import Ember from 'ember';

const {Component, get} = Ember;

export default Component.extend({
	tagName: ['Button'],
	classNames: ['Btn'],
	togglable: false,
	actions: {
		setSortKey(key) {
			return key;
		},
		toggleSetSortKey(key) {
			return key;
		}
	}
});
