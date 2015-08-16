import Ember from 'ember';

export default Ember.Route.extend({

	// refresh (fetch) any cached user session
	beforeModel: function() {
		return this.get('session').fetch().then(() => {
			// debug('user logged in (passively');
		}, () => {
			// debug('no user');
		});
	},

	actions: {
		logout() {
			this.get('session').close().then(() => {
				this.transitionTo('application');
			});
		}
	}
});
