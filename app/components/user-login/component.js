import Ember from 'ember';

const {Component, get} = Ember;

export default Component.extend({
	actions: {
		login(provider, email, password) {
			get(this, 'onLogin')(provider, email, password);
		}
	}
});
