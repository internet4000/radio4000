import Ember from 'ember';

export default Ember.Route.extend({
	redirectIfLoggedIn: function() {
		var authed = this.get('session.authed');
		var userChannel = this.get('session.userChannel');

		if (authed && userChannel) {
			// logged in with channel
			this.transitionTo('channel', userChannel);
		} else if (authed && !userChannel) {
			// logged in without channel
			this.transitionToRoute('new');
		} else if (!authed) {
			// logged out
			this.transitionTo('/');
		}
	}.observes('session.user.id')
});
