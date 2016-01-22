import Ember from 'ember';

const {Route} = Ember;

export default Route.extend({
	queryParams: {
		// search shouldn't mess with the URL
		search: {
			replace: true
		}
	},

	model() {
		// All channels without doing a request. This way the array updates
		// while we fetch more channels in the background.
		return this.store.peekAll('channel');
	},

	afterModel() {
		// Load more channels in the background.
		this.findChannels(5).then(() => {
			this.findChannels(20).then(() => {
				// Ember.run.schedule('afterRender', () => {
					this.findChannels().then(() => {
						// this.findChannels().then(() => {});
					});
				// });
			});
		});
	},

	// Returns either all or a limited query of a model type.
	// example: findChannels('track', 999);
	findChannels(howMany) {
		const modelType = 'channel';
		if (howMany) {
			return this.store.query(modelType, {limitToLast: howMany});
		}
		return this.store.findAll(modelType, {reload: true});
	}
});

// return this.store.find('channel', {orderBy: 'published', limitToLast: 5})
// return this.store.query('channel', {orderBy: 'category', startAt: 1, endAt: 1})
