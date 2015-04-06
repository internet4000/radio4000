import Ember from 'ember';

export default Ember.Route.extend({

	// Create a new track for the channel
	model() {
		Ember.debug('add model');
		return this.store.createRecord('track', {
			channel: this.modelFor('channel')
		});
	},

	// Abort if user isn't allowed to edit
	// this is the reason why we can't access channel/add directly, so I comment it out (hugo)
	afterModel() {
		var canEdit = this.controllerFor('channel').get('canEdit');

		Ember.debug('channel.add afterModel');
		Ember.debug(canEdit);
		// if (!canEdit) { this.transitionTo('channel.index', this.modelFor('channel')); }
	},

	actions: {

		//  this action is triggered from the add.js controller/template
		saveTrack() {
			var channel = this.modelFor('channel');
			var track = this.modelFor('channel.add');

			track.updateProvider();

			track.save().then(function() {
				// And add it to the tracks property of the channel
				Ember.RSVP.Promise.cast(channel.get('tracks')).then(function(tracks) {
					tracks.addObject(track);
					channel.save().then(function() {
						Ember.debug('Success: Track saved to channel');
					});
				});
			});

			// Go back!
			this.transitionTo('channel', channel);
		}
	},

	// clear any unsaved changes
	deactivate() {
		this.get('currentModel').rollback();
	}
});
