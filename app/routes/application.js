import Ember from 'ember';

export default Ember.Route.extend({
	actions: {
		login: function(provider) {
			this.get('auth').login(provider);
		},
		logout: function() {
			this.get('auth').logout();
		},
		showLogin: function(status) {
			this.transitionTo('application'); // make sure we are on the index page
			this.controllerFor('index').set('showLogin', status);
		}
	},
	deactivate: function() {
		this.controller.set('showLogin', false);
	}
});
