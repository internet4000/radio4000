import Ember from 'ember';
import ResetScroll from 'radio4000/mixins/reset-scroll'

const {Route, RSVP} = Ember

export default Route.extend(ResetScroll, {
	queryParams: {
		q: {
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
