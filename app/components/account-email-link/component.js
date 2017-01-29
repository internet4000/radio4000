import Ember from 'ember';

const {Component, get} = Ember;

export default Component.extend({
	actions: {
		link(email, password) {
			get(this, 'onLink')(email, password);
		}
	}
});
