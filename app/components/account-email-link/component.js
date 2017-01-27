import Ember from 'ember';

const {Component} = Ember;

export default Component.extend({
	actions: {
		link(email, password) {
			this.get('link')(email, password)
		}
	}
});
