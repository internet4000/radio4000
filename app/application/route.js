import Ember from 'ember';

const { debug } = Ember;

export default Ember.Route.extend({
	beforeModel: function() {

		// refresh (fetch) any cached user session
		return this.get('session').fetch().then(() => {
			// debug('got a session');
		}, () => {
			// debug('no session');
		});
	},

	actions: {
		logout() {
			this.get('session').close().then(() => {
				// todo: why does before this it: "Preparing to transition from 'channels.index' to 'login'"
				debug('logged out, application.route.action.logout');
				this.transitionTo('application');
			});
		},
		back() {
			window.history.back();
		}
	}
});
