import Ember from 'ember';

export default Ember.Route.extend({
	beforeModel: function() {
		this.get('session').fetch().catch(function() {
			// Ember.debug('when is this called');
		});
	},

	actions: {
		logout() {
			this.get('session').close();
		},
		back() {
			window.history.back();
		}
	}
});
