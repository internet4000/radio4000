import Ember from 'ember';

export default Ember.Route.extend({
	model(params) {
		return this.store
			.findRecord('track', params.track_id)
			.catch(error => {
				return this.transitionTo('channel.tracks')
			})
	}
});
