import Route from '@ember/routing/route';
import {get} from '@ember/object'
import { shuffleArray } from 'radio4000/utils/random-helpers'

export default Route.extend({
	// By combining and shuffling/randomizing featured channels
	// with their favorites we get a more exciting selection.

	maxFeatured: 20,
	maxFavoritesPerChannel: 3,
	maxTotal: 9,

	model() {
		return this.findFeatured().then(featured => {
			// console.log(`Found ${featured.get('length')} featured radios:`)
			// console.log(`${featured.map(f => f.get('title'))}`)
			const idsOfFavorites = featured.map(channel => this.getRandomFavorites(channel))
			const flattened = idsOfFavorites.reduce((prev, curr) => prev.concat(curr))
			const unique = flattened.uniq()
			const favorites = unique.map(id => this.store.findRecord('channel', id))
			const both = featured.toArray().concat(favorites).uniq()
			const uniq = both.uniq()
			const shuffled = shuffleArray(uniq)
			return shuffled.slice(0, get(this, 'maxTotal'))
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
		const someOfThem = shuffled.slice(0, get(this, 'maxFavoritesPerChannel'))
		return someOfThem
	}
})
