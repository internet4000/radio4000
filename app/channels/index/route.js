import Route from '@ember/routing/route';
import {get} from '@ember/object'
import {pickRandom} from 'radio4000/utils/random-helpers'

export default Route.extend({
	// By combining and shuffling/randomizing featured channels
	// with their favorites we get a more exciting selection.

	maxFeatured: 20,
	maxFavoritesPerChannel: 10,
	maxTotal: 9,

	model() {
		return this.findFeatured().then(featured => {
			// console.log({featured: featured.map(f => f.get('title'))})

			// Find favorites from the featured channels
			let favorites = featured
				.map(channel => this.getRandomFavorites(channel))
				.reduce((prev, curr) => prev.concat(curr))
				.uniq()
			// Turn them into requests for their channel model
			// favorites = favorites.map(id => this.store.findRecord('channel', id))
			// console.log({favorites});

			// Merge featured + favorites, remove duplicates and randomize.
			let merged = featured.toArray().map(f => f.id).concat(favorites)
			// console.log({merged})
			merged = merged.uniq()
			// console.log({mergedUnique: merged})

			// Limit how many and make it random.
			const result = pickRandom(merged, get(this, 'maxTotal'))
			// console.log({result});
			return result.map(id => this.store.findRecord('channel', id))
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
		return pickRandom(ids, get(this, 'maxFavoritesPerChannel'))
	}
})
