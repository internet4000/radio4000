import Ember from 'ember';

export default Ember.Route.extend({
	queryParams: {

		// search shouldn't mess with the URL
		search: {
			replace: true
		}
  }
});
