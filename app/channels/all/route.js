import Ember from 'ember';

const {Route} = Ember;

export default Route.extend({
	// When search changes the url, don't replace (add) to the history.
	// e.g. back/forth in browser works as expected.
	queryParams: {
		search: {
			replace: true
		}
	},

	model() {
		// return this.store.query('channel', {limitToLast: 100})
		this.store.findAll('channel')
		return this.store.peekAll('channel')
	}
});
