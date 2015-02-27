import Ember from 'ember';

export default Ember.Route.extend({
	redirectIfLoggedIn: function() {
		var userChannel = this.get('session.userChannel');
		// Ember.debug('redirectIfLoggedIn');
		// Ember.debug(userChannel);

		// redirects to either your own channel or /new once it detecs a user id
		if (userChannel) {
			this.transitionTo('channel', userChannel);
		} else {
			this.transitionTo('new');
		}
	}.observes('session.user.id')
});
