import Ember from 'ember';

export default Ember.Route.extend({

	userChanged: Ember.observer('session.user.id', function() {
		var authed = this.get('session.authed');
		var userChannel = this.get('session.userChannel');

		// Ember.debug('authed: ' + authed);
		// Ember.debug('channel: ' + userChannel);

		// authed with channel
		if (authed && userChannel) {
			// Ember.debug('logged in with channel');
			this.transitionTo('channel', userChannel);

		// authed without channel
		} else if (authed && !userChannel) {
			this.transitionTo('channels.new');

		// not authed
		} else if (!authed) {
			// Ember.debug('logged out');
			this.transitionTo('/');
		}
	})
});
