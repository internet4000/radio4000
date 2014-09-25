import Ember from 'ember';

export default Ember.ObjectController.extend({
	// pass the actions to the auth controller
	actions: {
		login: function(provider) {
			this.get('auth').login(provider);
		},
		logout: function() {
			this.get('auth').logout();
		}
	}
});
