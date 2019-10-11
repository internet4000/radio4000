import Route from '@ember/routing/route'
import RSVP from 'rsvp'
import ResetScroll from 'radio4000/mixins/reset-scroll'

export default Route.extend(ResetScroll, {
	queryParams: {
		search: {
			replace: true
		},
		locate: {
			replace: true
		}
	},

	model() {
		const channel = this.modelFor('channel')
		return RSVP.hash({
			channel,
			tracks: this.store.query('track', {
				orderBy: 'channel',
				equalTo: channel.id
			})
		});
	}
});
