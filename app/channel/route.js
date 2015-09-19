import Ember from 'ember';

export default Ember.Route.extend({
	model(params) {
		return this.store.query('channel', {
			orderBy: 'slug',
			equalTo: params.slug
		}).then((data) => data.get('firstObject'));
	},

	afterModel(model) {
		if (model) {
			document.title = model.get('title') + ' - Radio4000';
		}
	},

	// because we use slugs instead of ids in the url
	// tell ember what the 'slug' param maps to on our model
	serialize(model) {
		return { slug: model.get('slug') };
	},

	activate() {
		window.scrollTo(0, 0);
	},

	deactivate() {
		// Reset doc title when leaving the route
		document.title = 'Radio4000';
	},

	actions: {
		saveTrack(object) {
			const channel = this.get('currentModel');
			const track = this.store.createRecord('track', object);

			// set channel on track
			track.set('channel', channel);

			// in case url changed, we need to set the ytid
			track.updateProvider();

			// Save and add it to the tracks relationship on the channel
			track.save().then(function() {
				channel.get('tracks').then(function(tracks) {
					tracks.addObject(track);
					channel.save().then(function() {
						Ember.debug('Success: Track saved to channel');
					});
				});
			});
		},
		deleteTrack(track) {
			track.get('channel').then(channel => {
				channel.get('tracks').then(tracks => {
					tracks.removeObject(track);
					channel.save();
					track.destroyRecord();
				});
			});
		}
	}
});
