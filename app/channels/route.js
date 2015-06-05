import Ember from 'ember';

export default Ember.Route.extend({
	model() {

		// request all channels
		this.store.find('channel');

		// but don't return them so we render faster
		return this.store.all('channel');
	}
});
