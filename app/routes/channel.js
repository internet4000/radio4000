import Ember from 'ember';

export default Ember.Route.extend({
	model: function(params) {

		// TODO: this is how it should be, but no findQuery support in Emberfire
		// return this.store.find('channel', { slug: params.channel_slug });

		// alternative solution but loads all channels………
		return this.store.find('channel').then(function(channels) {
			return channels.findBy('slug', params.channel_slug);
		});

		// return new Ember.Promise(function(resolve, reject) {
		// 	ref.orderByChild('slug').equalTo(params.channel_slug).on('child_added', function(snapshot) {
		// 		// var results = [];
		// 		// snapshot.forEach(function(childSnapshot) {
		// 			// var payload = adapter._assignIdToPayload(childSnapshot);
		// 			// adapter._updateRecordCacheForType(type, payload);
		// 			// results.push(childSnapshot.val());
		// 		// });
		// 		console.log(snapshot.val());
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
