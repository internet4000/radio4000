import Ember from 'ember';

const {Route, get, set} = Ember;

export default Route.extend({
	didLoadAll: false,

	model() {
		const store = this.store;
		// Load all channels but don't return (block rendering)
		// Only needed once.
		if (!get(this, 'didLoadAll')) {
			store.findAll('channel');
			set(this, 'didLoadAll', true);
		}
		// Return cached channels, which is instant.
		return store.peekAll('channel');
	}
});

