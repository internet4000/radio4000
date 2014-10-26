import Ember from 'ember';

export default Ember.Route.extend({
	model: function(params) {
		// here we need to set the user's channel
		// can't figure out how to get only that so we currently get all channels
		return this.store.find('channel');
		// return this.store.find('channel', '-JXHtCxC9Ew-Ilck6iZ8');
	}
});
