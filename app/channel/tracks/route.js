import Route from '@ember/routing/route';
import ResetScroll from 'radio4000/mixins/reset-scroll'

export default Route.extend(ResetScroll, {
	model() {
		const channel = this.modelFor('channel')
		return this.store.query('track', {
			orderBy: 'channel',
			equalTo: channel.id
		})
	}
});
