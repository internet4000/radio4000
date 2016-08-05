import Ember from 'ember';

export default Ember.Route.extend({
	actions: {
		error(error) {
			if (error) {
				this.transitionTo('404');
			}
		}
	}
});
