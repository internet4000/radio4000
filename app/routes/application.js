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
	// force user to have a channel
	redirectIfNoChannel: function() {
		var authed = this.get('session.authed');
		var userChannel = this.get('session.userChannel');

		if (authed && !userChannel) {
			// logged in without channel
			this.transitionToRoute('new');
		}
	}.observes('session.user.id'),

	renderTemplate: function() {
		// because we overwrite the renderTemplate method
		// we need to tell it to also render the default template
		this.render();

		// and update nav bar
		this.render('contextual-navigation/cn-channels', {
			into: 'application',
			outlet: 'contextual-navigation'
		});
	}
});
