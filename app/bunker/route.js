import Ember from 'ember';

export default Ember.Route.extend({
	model() {
		return Ember.RSVP.hash({
			channelPublics: this.store.findAll('channel-public'),
			channels: this.store.findAll('channel'),
			tracks: this.store.findAll('track')
		});
	}
});
