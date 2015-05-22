import Ember from 'ember';

const { debug } = Ember;

export default Ember.Route.extend({
	beforeModel: function() {
		// @todo, what the fuck here?
		// sign the user in
		return this.get('session').fetch().then(() => {
			debug('fetched success?');
		}, () => {
			debug('fetched fail?');
		});
	},

	actions: {
		logout() {
			this.get('session').close().then(() => {
				// todo: why does before this it: "Preparing to transition from 'channels.index' to ' login'"
				debug('logged out, application.route.action.logout');
				this.transitionTo('application');
			});
		},
		back() {
			window.history.back();
		}
	}
});
