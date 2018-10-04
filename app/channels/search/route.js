import Route from '@ember/routing/route'

let didFetch = false

export default Route.extend({
	// When search changes the url, don't replace (add) to the history.
	// e.g. back/forth in browser works as expected.
	queryParams: {
		search: {
			replace: true
		}
	},

	model() {
		return this.store.peekAll('channel')
		// return this.store.query('channel', {limitToLast: 100})
	},

	afterModel () {
		if (!didFetch) {
			this.store.findAll('channel')
			didFetch = true
		}
	}
})
