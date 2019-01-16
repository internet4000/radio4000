import Route from '@ember/routing/route'

let cache

export default Route.extend({
	// When search changes the url, don't replace (add) to the history.
	// e.g. back/forth in browser works as expected.
	queryParams: {
		search: {
			replace: true
		}
	},

	model() {
		if (cache) {
			return cache
		}
		return this.store.findAll('channel').then(model => {
			cache = model
			return model
		})
	}
});
