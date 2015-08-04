import Ember from 'ember';

export default Ember.Route.extend({
	model() {
		return Ember.RSVP.hash({
			featured: this.store.query('channel', {
				orderBy: 'isFeatured',
				equalTo: true
			})
		});
	},
	afterModel() {
		return this.store.findAll('channel-public');
	}
});
