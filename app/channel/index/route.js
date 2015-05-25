import Ember from 'ember';

const { debug } = Ember;

export default Ember.Route.extend({
	beforeModel() {
		// 404 page
		let channel = this.modelFor('channel');
		if (!channel) { this.transitionTo('404'); }
	},

	model() {

		// we don't use model.tracks because it's too slow to render
		// all tracks immediately
		let channel = this.modelFor('channel');

		// here we make requests for the first X models
		// and then return store.all so that we'll also
		// recieve any future model changes
		return this.findMax(30).then(() => {

			// "all" doesn't make a request
			return this.store.all('track', { channel: channel });
		});
	},

	afterModel() {
		// we don't return a promise here in order to render what
		// the model hook returns first
		this.modelFor('channel').get('tracks').then((tracks) => {
			// now the tracks are loaded
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
