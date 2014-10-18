import Ember from 'ember';

export default Ember.Route.extend({

	redirectIfLoggedIn: function() {
		if (this.get('session.user.id')) {
			this.transitionTo('/');
		}
	}.observes('session.user.id')

});
