import Ember from 'ember';

export default Ember.Route.extend({
	model: function(params) {

		// 1. This is how it should be
		// but no findQuery support in Emberfire
		// return this.store.find('channel', { slug: params.channel_slug });

		// 2. Alternative solution
		// but loads all channels………
		return this.store.find('channel').then(function(channels) {
			return channels.findBy('slug', params.channel_slug);
		});

		// 3. firebase way but doesn't return an ember model
		// because it doesn't go through the adapter
		// var ref = new window.Firebase('https://radio4000.firebaseio.com/channels');
		// return new Ember.Promise(function(resolve, reject) {
		// 	ref.orderByChild('slug').equalTo('yas').on('child_added', function(snapshot) {
		// 		// var results = [];
		// 		// var payload = adapter._assignIdToPayload(snapshot);
		// 		// adapter._updateRecordCacheForType(type, payload);
		// 		// results.push(snapshot.val());
		// 		resolve(snapshot.val());
		// 	}, function(error) {
		// 		reject(error);
		// 	});
		// });
	},

	// because we use slugs instead of ids in the url
	serialize: function(model) {
		return { channel_slug: model.get('slug') };
	},

	afterModel: function(model) {
		window.scrollTo(0,0);
		document.title = model.get('title') + ' - Radio4000';
		this.controllerFor('channel.edit').set('model', model);
	},

	// Reset doc title when leaving the route
	deactivate: function() {
		document.title = 'Radio4000';
	}
});
