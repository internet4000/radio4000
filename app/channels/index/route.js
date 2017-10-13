import Ember from 'ember'
import RSVP from 'rsvp'

const {get, Route} = Ember;

export default Route.extend({
	model() {
		return this.findFeatured().then(featured => {
			return featured.map(channel => this.findFavorites(channel))
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
		return RSVP.all(promises)
	}
})
