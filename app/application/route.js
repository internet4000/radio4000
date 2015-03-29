import Ember from 'ember';

export default Ember.Route.extend({
	channelId: Ember.computed.alias('session.userChannel.id'),

	channelChanged: Ember.observer('channelId', function() {
		var channel = this.get('session.userChannel');

		if (!channel) {
			// Ember.debug('authed without channel -> force ');
			this.transitionTo('channels.new');
		} else if (channel) {
			// this.transitionTo('channel', channel);
		}
	}),

	renderTemplate() {
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
		login(provider) {
			this.get('session').login(provider);
		},

		logout() {
			this.get('session').logout();
		}
	}
});
