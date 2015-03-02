import Ember from 'ember';

export default Ember.Route.extend({
	redirectIfLoggedIn: function() {
		var authed = this.get('session.authed');
		var userChannel = this.get('session.userChannel');

		Ember.debug('authed: ' + authed);
		Ember.debug('channel: ' + userChannel);

		if (authed && userChannel) {
			Ember.debug('logged in with channel');
			this.transitionTo('channel', userChannel);
		} else if (authed && !userChannel) {
			// Ember.debug('logged in without channel');
			// we don't need to do anything here because app route does it
			// this.transitionTo('channels.new');
		} else if (!authed) {
			Ember.debug('logged out');
			this.transitionTo('/');
		}
	}.observes('session.user.id')
});
