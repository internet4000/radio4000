import Ember from 'ember';

const {Route,
			 get,
			 set,
			 inject} = Ember;

export default Route.extend({
	model(params) {
		return this.store
			.findRecord('track', params.track_id)
			.catch(error => {
				return this.transitionTo('channel.tracks')
			})
	}
});
