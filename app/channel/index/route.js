import Ember from 'ember';

export default Ember.Route.extend({

	// we don't return the promise which in turn
	// renders the template immediately (faster yay!)
	model() {

		// a) FOR TESTING EMBER-LIST-VIEW
		// let items = [];
		// for (var i = 0; i < 41; i++) {
		// 	items.push({ title: `Item ${i}` });
		// }
		// return items;

		// b) NORMAL MODEL (but really slow rendering)
		// return this.modelFor('channel').get('tracks');

		// c) FAST HACKY (smart) METHOD
		let model = Ember.A([]);

		this.getFirstTracks(model, 50).then((tracks) => {

			// might need an Ember.run wrap
			Ember.run.schedule('render', () => {
				Ember.debug('adding first tracks');
				model.addObjects(tracks);
			});

			// without this run loop, it runs before the first tracks are rendeed
			Ember.run.later(() => {
				this.modelFor('channel').get('tracks').then((tracks) => {
					Ember.debug('adding all tracks');
					model.addObjects(tracks);
				});
			});
		}, (error) => {
			Ember.debug(error);
		});

		return model;
	},

	// finds the last, limited models to improve initial render times
	// then loads the rest
	// see: https://github.com/firebase/emberfire/issues/243#issuecomment-94038081
	getFirstTracks(model, limit) {
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
						Ember.debug('no value');
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
