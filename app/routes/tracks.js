import Ember from 'ember';

export default Ember.Route.extend({
	model: function() {
		// we only want the tracks from the parent channel route
		return this.modelFor('channel').get('tracks');
	}
});
