import Ember from 'ember';

export default Ember.Route.extend({
	model() {
		return this.store.findAll('channel');
	},

	queryParams: {
		// search shouldn't mess with the URL
		search: {
			replace: true
		}
  }
});
