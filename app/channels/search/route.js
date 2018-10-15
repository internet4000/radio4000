import Route from '@ember/routing/route'

export default Route.extend({
	// When search changes the url, don't replace (add) to the history.
	// e.g. back/forth in browser works as expected.
	queryParams: {
		search: {
			replace: true
		}
	},

	model() {
		return this.store.findAll('channel')
		// return this.store.query('channel', {limitToLast: 200})
	}
})
