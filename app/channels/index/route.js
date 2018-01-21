import Route from '@ember/routing/route';
import {get} from '@ember/object'
import { shuffleArray } from 'radio4000/utils/random-helpers'

export default Route.extend({
	// We will show X random favorites from Y featured channels.
	// 9 total is a good number for our current layout on desktop.
	maxFeatured: 4,
	maxFavorites: 2,

	model() {
		return this.findFeatured().then(featured => {
			// console.log(`Found ${featured.get('length')} featured radios:`)
			// console.log(`${featured.map(f => f.get('title'))}`)
			const idsOfFavorites = featured.map(channel => this.getRandomFavorites(channel))
			const flattened = idsOfFavorites.reduce((prev, curr) => prev.concat(curr))
			const unique = flattened.uniq()
			const favorites = unique.map(id => this.store.findRecord('channel', id))
			return featured.toArray().concat(favorites)
		})
	},

	findFeatured() {
		return this.store.query('channel', {
			orderBy: 'isFeatured',
			equalTo: true,
			limitToLast: get(this, 'maxFeatured')
		})
	},

	// Returns an array of arrays with ids of favorites.
	// [[1,6,2], [3,4,5]]
	getRandomFavorites(channel) {
		const ids = channel.hasMany('favoriteChannels').ids()
		const shuffled = shuffleArray(ids)
		const someOfThem = shuffled.slice(0, get(this, 'maxFavorites'))
		return someOfThem
	}
})
