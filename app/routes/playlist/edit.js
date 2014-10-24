import Ember from 'ember';

export default Ember.Route.extend({

	// Abort if user isn't allowed to edit
	beforeModel: function() {
		var canEdit = this.controllerFor('playlist').get('canEdit');
		if (!canEdit) { this.transitionTo('playlist', this.modelFor('playlist')); }
	},

	model: function() {
		return this.modelFor('playlist');
	},

	// not sure why this is not the model hook but that's what ember docs say
	afterModel: function() {
		this.set('model', this.modelFor('playlist'));
	},

	// render into the playlist template
	renderTemplate: function() {
		this.render({ outlet: 'playlist-header'});
	},

	actions: {
		//  this action is triggered from the add.js controller/template
		saveTrack: function(track) {
			var playlist = this.controllerFor('playlist').get('model');
			track.save().then(function() {
			});
		},
		tryDelete: function() {
			var confirmed = confirm('Are you sure? Your playlist will be gone forever. But you can always create a new one.');
			if (confirmed) {
				this.controllerFor('playlist').send('deletePlaylist');
			}
		}
	}
});
