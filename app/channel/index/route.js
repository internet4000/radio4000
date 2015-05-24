import Ember from 'ember';

const { debug } = Ember;

export default Ember.Route.extend({
	beforeModel() {
		let channel = this.modelFor('channel');
		if (!channel) { this.transitionTo('404'); }
	},

	model() {
		return this.findMax(40).then((tracks) => {
			debug('returning already fetched tracks');

			// "all" doesn't do a request
			return this.store.all('track', { channel: this.modelFor('channel') });
		}, (error) => {
			debug(error);
		});
	},

	afterModel() {

		// here we request all tracks
		this.modelFor('channel').get('tracks');
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
