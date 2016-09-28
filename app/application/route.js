import Ember from 'ember';

export default Ember.Route.extend({
	actions: {
		accessDenied(err) {
			if (err) {
				console.log(err);
				// this.transitionTo('404');
			}
		}
	}
});
