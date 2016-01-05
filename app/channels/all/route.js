import Ember from 'ember';

export default Ember.Route.extend({
	queryParams: {
		// search shouldn't mess with the URL
		search: {
			replace: true
		}
	},

	setupController(controller, model) {
		this.store.findAll('channel').then(channels => {
			controller.set('model', channels);
		});
	}
});
