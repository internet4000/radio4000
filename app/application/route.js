import Ember from 'ember';

export default Ember.Route.extend({
	channelChanged: Ember.observer('session.userChannel.id', function() {
		var channel = this.get('session.userChannel');

		if (!channel) {
			// Ember.debug('channelChanged without channel -> force');
			this.transitionTo('channels.new');
		} else if (channel) {
			// Ember.debug('channelChanged with channel');
			this.transitionTo('channel', channel);
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
