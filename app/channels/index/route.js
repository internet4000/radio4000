import Ember from 'ember'
import RSVP from 'rsvp'

const {Route} = Ember;

export default Route.extend({
	model() {
		return this.findFeatured().then(featured => {
			const promises = featured.map(channel => this.findFavorites(channel))
			const flattened = promises.reduce((prev, curr) => prev.concat(curr))
			return RSVP.all(flattened)
		})
	},

	findFeatured(amount = 3) {
		return this.store.query('channel', {
			orderBy: 'isFeatured',
			equalTo: true,
			limitToLast: amount
		})
	},

	findFavorites(channel, amount = 3) {
		const ids = channel.hasMany('favoriteChannels').ids()
		const someIds = ids.slice(0, amount)
		const promises = someIds.map(id => this.store.findRecord('channel', id))
		return promises
	}
})
