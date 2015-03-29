import Ember from 'ember';

export default Ember.Route.extend({

	redirectWithoutChannel: function() {
		var channel = this.get('session.userChannel');

		if (!channel) {
			// Ember.debug('authed without channel -> force ');
			this.transitionTo('channels.new');
		} else if (channel) {
			// this.transitionTo('channel', channel);
		}
	}.observes('session.userChannel.id'),

	renderTemplate: function() {
		// because we overwrite the renderTemplate method
		// we need to tell it to also render the default template
		this.render();

		// and update nav bar
		this.render('contextual-navigation/cn-channels', {
			into: 'application',
			outlet: 'contextual-navigation'
		});
	},

	actions: {
		login: function(provider) {
			this.get('session').login(provider);
		},
		logout: function() {
			this.get('session').logout();
		}
	}
});
