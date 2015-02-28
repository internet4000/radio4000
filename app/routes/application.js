import Ember from 'ember';

export default Ember.Route.extend({

	redirectWithoutChannel: function() {
		Ember.debug('redirectWithoutChannel');
		Ember.debug(this.get('session.userChannel'));

		if (this.get('session.authed') && !this.get('session.userChannel')) {
			this.transitionTo('new');
		}
	}.observes('session.authed', 'session.userChannel.id'),

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
