import Ember from 'ember';

export default Ember.Route.extend({
	player: Ember.inject.service(),
	model(params) {
		return this.store.findRecord('track', params.track_id);
	},
	afterModel(track) {
		this.get('player').playTrack(track);
	}
});
