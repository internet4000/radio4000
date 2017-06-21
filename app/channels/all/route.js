import Ember from 'ember';

const {Route, get, set} = Ember;

export default Route.extend({
	didFindAll: false,

	model() {
		const store = this.store;
		// Load all channels but don't return (block rendering)
		// Only needed once.
		if (!get(this, 'didFindAll')) {
			set(this, 'didFindAll', true);
			return store.findAll('channel');
		}
		// Return cached channels, which is instant.
		return store.peekAll('channel');
	}
});

