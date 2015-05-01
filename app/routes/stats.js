import Ember from 'ember';

export default Ember.Route.extend({
	model() {
		return Ember.RSVP.hash({
			channels: this.store.find('channel'),
			tracks: this.store.find('track'),
			users: this.store.find('user')
		});
	}
});
