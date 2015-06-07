import Ember from 'ember';

export default Ember.Route.extend({
	model() {
		return Ember.RSVP.hash({
			channelPublics: this.store.find('channel-public'),
			channels: this.store.find('channel'),
			tracks: this.store.find('track')
		});
	}
});
