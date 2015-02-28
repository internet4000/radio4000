import Ember from 'ember';

export default Ember.Route.extend({
	// Abort if user isn't allowed to edit
	beforeModel: function() {
		var canEdit = this.controllerFor('channel').get('canEdit');
		if (!canEdit) { this.transitionTo('channel', this.modelFor('channel')); }
	},
	// Create a new track for the channel
	model: function() {
		return this.store.createRecord('track', {
			channel: this.modelFor('channel')
		});
	},
	actions: {

		//  this action is triggered from the add.js controller/template
		saveTrack: function() {
			var channel = this.modelFor('channel');
			var track = this.modelFor('channel.add');

			Ember.debug(channel);
			Ember.debug(track);

			// Set extra properties
			track.setProperties({
				created: new Date().getTime()
			});

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
	deactivate: function() {
		this.get('currentModel').rollback();
	}
});
