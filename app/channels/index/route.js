import Route from '@ember/routing/route'
import {get} from '@ember/object'
import {pickRandom} from 'radio4000/utils/random-helpers'

// By combining and shuffling/randomizing featured channels
// with their favorites we get a more exciting selection.
let cache

export default Route.extend({
	maxFeatured: 20,
	maxFavoritesPerChannel: 10,
	maxTotal: 3,

	model() {
		if (cache) {
			return cache
		}
		return this.findFeatured().then(featured => {
			// Collect the unique favorites from the featured radios.
			let favorites = featured
				.map(channel => this.getRandomFavorites(channel))
				.reduce((prev, curr) => prev.concat(curr))
				.uniq()

			// We want to show a mix of featured and favorites,
			// so we merge them, remove duplicates and randomize.
			let merged = featured
				.toArray()
				.map(f => f.id)
				.concat(favorites)
			merged = merged.uniq()

			// Limit how many and make it random.
			const channelIds = pickRandom(merged, get(this, 'maxTotal'))

			// Return an array of promises.
			const promises = channelIds.map(id => this.store.findRecord('channel', id))
			cache = promises
			return promises
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
	},

	actions: {
		refreshSelection() {
			cache = null
			// refresh the model
			this.refresh()
		}
	}
})
