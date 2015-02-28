import Ember from 'ember';

export default Ember.Route.extend({

	actions: {
		login: function(provider) {
			this.get('session').login(provider);
		},
		logout: function() {
			this.get('session').logout();
		}
	},

	beforeModel: function() {
		// this.redirectIfNoChannel();
	},

	// force user to have a channel
	redirectIfNoChannel: function() {
		var userChannel = this.get('session.userChannel');
		// Ember.debug('redirectIfNoChannel');
		// Ember.debug(userChannel);

		// redirects to either user.channel or /new once it detecs a user id
		if (!userChannel) {
			this.transitionTo('new');
		}
	}.observes('session.user.id')

});
