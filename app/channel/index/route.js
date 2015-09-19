import Ember from 'ember';

const { debug } = Ember;

export default Ember.Route.extend({
	beforeModel() {
		// 404 page
		let channel = this.modelFor('channel');
		if (!channel) {
			this.transitionTo('404');
		}
	},

	model() {
		return Ember.RSVP.hash({
			channel: this.modelFor('channel'),
			tracks:
			// we load tracks seperately in setupController
		});
	},

	setupController(controller, channel) {
		let cid = controller.get('model.id');

		if (cid && cid === channel.id) {
			console.log('same channel, no need to query');
			controller.set('tracks', []);
		} else {
			console.log('no cid');
		}

		// Immediately set the channel model
		// controller.setProperties(models);
		controller.set('model', channel);

		// Start finding tracks and set them when available
		channel.get('tracks').then(tracks => {
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
	// 					debug('no value');
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
