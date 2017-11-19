import Ember from 'ember'
import resetScroll from 'radio4000/mixins/reset-scroll'

export default Ember.Route.extend(resetScroll, {
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
