import Ember from 'ember';

export default Ember.Route.extend({

	// we don't return the promise which in turn
	// renders the template immediately (faster yay!)
	// return this.modelFor('channel').get('tracks');
	model() {
		let model = Ember.A([]);

		// "20" is the number of tracks it takes to fill up a 24" viewport
		this.findLimited(model, 20);

		return model;
	},

	// afterModel(model) {

	// },

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

				// break if we have nothing
				if (!snapshot.val()) {
					return false;
				}

				let ids = Object.keys(snapshot.val());

				// create an array of Promises (that's what find returns)
				let requests = ids.map((id) => {
					return this.store.find('track', id);
				});

				// go through them
				Ember.RSVP.all(requests).then((tracks) => {

					console.log('adding first tracks');

					// might need an Ember.run wrap
					model.addObjects(tracks);

					// without this run loop, it doesn't work on reload
					Ember.run.later(() => {

						// load the rest
						this.modelFor('channel').get('tracks').then((tracks) => {
							console.log('adding all tracks');
							model.addObjects(tracks);
						});
					});
				});
			});
	}
});

// return this.store.find('channel', {
// 	orderBy: 'slug',
// 	equalTo: slug
// })
//
// // this part is needed because emberfire: https://github.com/firebase/emberfire/issues/235
// .then((channels) => {
// 	return channels.findBy('slug', slug);
// });
//

// this.store.find('track', {
// 	// orderBy: 'channel',
// 	// equalTo: '-J_Mp1OhyLuo4tJozPAV'
// 	// startAt: 200
// 	// orderBy: 'title',
// 	// equalTo: 'Nino Nardini - Tropicola',
//
// 	orderBy: 'channel',
// 	equalTo: '-J_Mp1OhyLuo4tJozPAV',
// 	limitToLast: 5
//
// }).then((tracks) => {
// 	Ember.debug(tracks);
// 	model.addObjects(tracks);
// });
