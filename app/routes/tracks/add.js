import Ember from 'ember';

export default Ember.Route.extend({
	// Abort if user isn't allowed to edit
	beforeModel: function() {
		var canEdit = this.controllerFor('channel').get('canEdit');
		if (!canEdit) { this.transitionTo('channel', this.modelFor('channel')); }
	},
	// Create a new model we can use for the track
	model: function() {
		return this.store.createRecord('track');
	},
	setupController: function(controller, model) {
		controller.set('model', model);
		controller.set('isExpanded', true);
	},
	renderTemplate: function() {
		this.render({
			into: 'channel',
			outlet: 'channel-body'
		});
	},
	deactivate: function() {
		this.controller.set('isExpanded', false);
	},
	actions: {
		//  this action is triggered from the add.js controller/template
		saveTrack: function(track) {
			var channel = this.modelFor('channel');

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
	}
});
