import Route from '@ember/routing/route'

export default Route.extend({
	model(params) {
		return this.store
			.findRecord('track', params.track_id)
			.catch(() => {
				return this.transitionTo('channel.tracks')
			})
	}
});
