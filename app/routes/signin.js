import Ember from 'ember';

export default Ember.Route.extend({
	redirectIfLoggedIn: function() {
		var authed = this.get('session.authed');
		var userChannel = this.get('session.userChannel');

		if (authed && userChannel) {
			Ember.debug('logged in with channel');
			// logged in with channel
			this.transitionTo('channel', userChannel);
		} else if (authed && !userChannel) {
			Ember.debug('logged in without channel');
			// logged in without channel
			this.transitionTo('new');
		} else if (!authed) {
			Ember.debug('logged out');
			// logged out
			this.transitionTo('/');
		}
	}.observes('session.user.id')
});
