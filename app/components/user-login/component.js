import Ember from 'ember';

const {Component, get} = Ember;

export default Component.extend({
    actions: {
	login(provider, email, password) {
	    let data = {
		provider,
		email,
		password
	    };
	    get(this, 'onLogin')(data);
	},
	register() {}
    }
});
