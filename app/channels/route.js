import Ember from 'ember';

export default Ember.Route.extend({
	model() {
		var items = [];

		this.store.find('channel', {
			orderBy: 'tracks',
			limitToLast: 12,

			// not sure what this does but it works
			startAt: 200

		}).then((channels) => {
			items.addObjects(channels);
		});

		return items;
	}
});
