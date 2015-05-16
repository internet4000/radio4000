import Ember from 'ember';

export default Ember.Route.extend({
	beforeModel: function() {
		// @todo, what the fuck here?
		// sign the user in
		Ember.debug('application:beforemodel');
		this.get('session').fetch().then(() => {
			Ember.debug('fetched success?');
		}, () => {
			Ember.debug('fetched fail?');
		});
	},

	actions: {
		logout() {
			this.get('session').close().then(() => {
				// todo: why does before this it: "Preparing to transition from 'channels.index' to ' login'"
				Ember.debug('logged out, application.route.action.logout');
				this.transitionTo('application');
			});
		},
		back() {
			window.history.back();
		}
	}
});
