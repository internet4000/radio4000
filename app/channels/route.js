import Ember from 'ember';

export default Ember.Route.extend({
	model() {
		let items = Ember.A([]);

		this.store.find('channel', {
			orderBy: 'tracks',
			limitToLast: 12,

			// not sure what this does but it works
			startAt: 200

		}).then((channels) => {
			items.addObjects(channels);
		});

		return items;

		// todo: return two arrays of channels filtered diferently ('featured' and 'most popular')
		// http://stackoverflow.com/questions/20521967/emberjs-how-to-load-multiple-models-on-the-same-route
		// channelByFollowers: this.store.find('channel', {
		// 	orderBy: 'tracks',
		// 	limitToLast: 12,

		// 	// not sure what this does but it works
		// 	startAt: 200
		// }),

		// channelByFeatured: this.store.find('channel', {
		// 	orderBy: 'isFeatured',
		// 	limitToLast: 12,
		// 	// not sure what this does but it works
		// 	startAt: 200
		// })


	}
});
