import Ember from 'ember'
import RSVP from 'rsvp'
import { shuffleArray } from 'radio4000/utils/random-helpers'

const { Route, get } = Ember

export default Route.extend({
	// We will show X random favorites from Y featured channels.
	maxFeatured: 3,
	maxFavorites: 3,

	model() {
		return this.findFeatured().then(featured => {
			const ids = featured.map(channel => this.findFavorites(channel))
			const flattened = ids.reduce((prev, curr) => prev.concat(curr))
			const unique = flattened.uniq()
			// console.log({ ids, flattened, unique })
			const promises = unique.map(id => this.store.findRecord('channel', id))
			return RSVP.all(promises)
		})
	},

	findFeatured() {
		return this.store.query('channel', {
			orderBy: 'isFeatured',
			equalTo: true,
			limitToLast: get(this, 'maxFeatured')
		})
	},

	findFavorites(channel) {
		const ids = channel.hasMany('favoriteChannels').ids()
		const shuffled = shuffleArray(ids)
		return shuffled.slice(0, get(this, 'maxFavorites'))
	}
})
