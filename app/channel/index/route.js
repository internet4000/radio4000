import Ember from 'ember';

export default Ember.Route.extend({
	setupController(controller, channel) {
		this._super(...arguments)
		controller.set('channel', channel)
		this.store.query('track', {
			orderBy: 'channel',
			equalTo: channel.id,
			limitToLast: 10
		}).then(latestTracks => {
			controller.set('latestTracks', latestTracks)
		})
	}
});
