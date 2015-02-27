import Ember from 'ember';

export default Ember.Route.extend({
	actions: {
		login: function(provider) {
			this.get('session').login(provider);
		},
		logout: function() {
			this.get('session').logout();
		}
	}
});
