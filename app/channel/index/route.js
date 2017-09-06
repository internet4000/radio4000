import Ember from 'ember';

export default Ember.Route.extend({
	setupController(controller, model) {
		this._super(...arguments)

		controller.set('model', model)

		this.store.query('track', {
			orderBy: 'channel',
			equalTo: model.id,
			limitToLast: 10
		}).then(latestTracks => {
			controller.set('latestTracks', latestTracks)
		})
	}
});
