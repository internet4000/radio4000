import Ember from 'ember';

export default Ember.Route.extend({
	redirectIfLoggedIn: function() {
		if (this.get('session.user.id')) {
			this.transitionTo('channels');
		}
	}.observes('session.user.id')
});
