import Route from '@ember/routing/route'
import { generateUniqueHashtags } from '../../utils/hashtag'

export default Route.extend({
	model() {
		const channel = this.modelFor('channel')
		return this.store.query('track', {
			orderBy: 'channel',
			equalTo: channel.id
		}).then(tracks => {
			const tags = generateUniqueHashtags(tracks)
			return {
				channel,
				tracks,
				tags
			}
		})
	}
})
