import Ember from 'ember';

export default Ember.Route.extend({
	beforeModel() {
		// 404 page
		let channel = this.modelFor('channel');
		if (!channel) {
			this.transitionTo('404');
		}
	},

	model() {
		return this.modelFor('channel');
	},

	setupController(controller, model) {
		// Because controllers are singleton,
		// they keep the tracks between channels.
		// This avoids it.
		let cachedId = controller.get('model.id');
		if (cachedId && cachedId !== model.id) {
			controller.set('tracks', []);
		}

		// Immediately set the channel model
		controller.set('model', model);

		// Start finding tracks and set them when available
		model.get('tracks').then(tracks => {
			controller.set('tracks', tracks);
		});

		this._super(...arguments);
	}

	// returns a promise to the last (e.g. newest) X models
	// see: https://github.com/firebase/emberfire/issues/243#issuecomment-94038081
	// findMax(limit) {
	// 	let id = this.modelFor('channel').get('id');
	// 	let adapter = this.store.adapterFor('channel');

	// 	return new Ember.RSVP.Promise((resolve, reject) => {

	// 		adapter._getRef('channel').child(id).child('tracks')
	// 			.orderByKey()
	// 			.limitToLast(limit)
	// 			.on('value', (snapshot) => {
	// 				let requests = [];

	// 				// break if we have nothing
	// 				if (!snapshot.val()) {
	// 					Ember.debug('no value');
	// 					return false;
	// 				}

	// 				snapshot.forEach((s) => {
	// 					requests.push(this.store.findRecord('track', s.key()));
	// 				});

	// 				// go through them
	// 				Ember.RSVP.all(requests).then((tracks) => {
	// 					resolve(tracks);
	// 				}, (reason) => {
	// 					reject(reason);
	// 				});
	// 			});
	// 	});
	// }
});
