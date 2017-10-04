import Ember from 'ember'

export default Ember.Route.extend({
	model() {
		const channel = this.modelFor('channel')
		const latestTracks = this.store.query('track', {
			orderBy: 'channel',
			equalTo: channel.id,
			limitToLast: 10
		})
		return Ember.RSVP.hash({
			channel,
			latestTracks
		})
	}
})
