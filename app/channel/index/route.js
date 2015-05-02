import Ember from 'ember';

export default Ember.Route.extend({

	// we don't return the promise which in turn
	// renders the template immediately (faster yay!)
	// return this.modelFor('channel').get('tracks');
	model() {
		let model = Ember.A([]);
		// return this.modelFor('channel').get('tracks');

		// TODO
		// this version doesn't live update when deleting tracks, for instance
		// "20" is the magic number of tracks it takes to fill up a 24" viewport
		this.findLimited(model, 20);

		return model;
	},

	// finds the last, limited models to improve initial render times
	// then loads the rest
	// see: https://github.com/firebase/emberfire/issues/243#issuecomment-94038081
	findLimited(model, limit) {
		let id = this.modelFor('channel').get('id');
		let adapter = this.store.adapterFor('channel');

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

					// might need an Ember.run wrap
					Ember.run.schedule('render', () => {
						Ember.debug('adding first tracks');
						model.addObjects(tracks);
					});

					// without this run loop, it runs before the first tracks are rendeed
					Ember.run.later(() => {
						this.findAll(model);
					});
				});
			});
	},

	// load all
	findAll(model) {
		this.modelFor('channel').get('tracks').then((tracks) => {
			Ember.debug('adding all tracks');
			model.addObjects(tracks);
		});
	}
});
