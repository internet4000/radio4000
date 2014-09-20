import Ember from 'ember';

export default Ember.ObjectController.extend({
	// pass the actions to the auth controller
	actions: {
		login: function(provider) {
			// this.get('auth').login(provider);
			Ember.debug('testing login');
		},
		logout: function() {
			// this.get('auth').logout();
			Ember.debug('testing logout');
		}
	}
});
