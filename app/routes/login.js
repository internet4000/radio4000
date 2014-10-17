import Ember from 'ember';

export default Ember.Route.extend({

	redirectIfLoggedIn: function() {
		if (this.get('auth.user.id')) {
			this.transitionTo('/');
		}
	}.observes('auth.user.id')

});
