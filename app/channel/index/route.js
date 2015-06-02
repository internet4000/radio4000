import Ember from 'ember';

const { debug } = Ember;

export default Ember.Route.extend({
	beforeModel() {
		// 404 page
		let channel = this.modelFor('channel');
		if (!channel) { this.transitionTo('404'); }
	},

	model() {

		return this.modelFor('channel').get('tracks');
		// we don't use model.tracks because it's too slow to render
		// all tracks immediately
		// let channel = this.modelFor('channel');

		// debug('Returning model from: ' + channel.get('title'));

		// "all" doesn't make a request
		// return this.store.all('track', { channel: channel });
	},

	afterModel(model) {
		// let channel = this.modelFor('channel');
		// let hasTracks = model.get('length');
		//
		// debug(channel.get('title') + ' has ' + hasTracks + ' tracks');
		//
		// if (!hasTracks) {
		// 	this.something();
		// }
	},

	something() {
		let channel = this.modelFor('channel');

		// here we make requests for the first X models
		// and then return store.all so that we'll also
		// recieve any future model changes
		this.findMax(30).then(() => {
			debug('Got tracks from: ' + channel.get('title'));

			// we don't return a promise here in order to render what
			// the model hook returns first
			channel.get('tracks').then(() => {
				// now the tracks are loaded

				debug('Got all tracks');

			});
		});
	},

	// returns a promose to the last (e.g. newest) X models
	// see: https://github.com/firebase/emberfire/issues/243#issuecomment-94038081
	findMax(limit) {
		let id = this.modelFor('channel').get('id');
		let adapter = this.store.adapterFor('channel');

		return new Ember.RSVP.Promise((resolve, reject) => {

			adapter._getRef('channel').child(id).child('tracks')
				.orderByKey()
				.limitToLast(limit)
				.on('value', (snapshot) => {
					let requests = [];

					// break if we have nothing
					if (!snapshot.val()) {
						debug('no value');
						return false;
					}

					snapshot.forEach((s) => {
						requests.push(this.store.find('track', s.key()));
					});

					// go through them
					Ember.RSVP.all(requests).then((tracks) => {
						resolve(tracks);
					}, (reason) => {
						reject(reason);
					});
				});
		});
	}
});
