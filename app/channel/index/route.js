import { hash } from 'rsvp';
import Route from '@ember/routing/route';

export default Route.extend({
	model() {
		const channel = this.modelFor('channel')
		const latestTracks = this.store.query('track', {
			orderBy: 'channel',
			equalTo: channel.id,
			limitToLast: 10
		})
		return hash({
			channel,
			latestTracks
		});
	}
})
