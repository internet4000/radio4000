var PlaylistController = Ember.ObjectController.extend({
	needs: ['auth'],
	isEditing: false,
	isAdding: false,

	init: function () {
		this._super();
		this.authController = this.get('controllers.auth');
	},

	trackIsValid: function() {
		var isValid = true;
		['trackUrl'].forEach(function(field) {
			if (this.get(field) === '') {
				isValid = false;
			}
		}, this);
		return isValid;
	},

	actions: {
		editPlaylist: function() {
			this.set('isEditing', true);
		},
		saveEditing: function() {
			this.set('isEditing', false);
			this.get('model').save();
		},
		addTrack: function() {
			this.set('isAdding', true);
		},
		cancelEditing: function() {
			this.set('isEditing', false);
		},
		cancelTrack: function() {
			this.set('isAdding', false);
		},
		publishTrack: function(playlist, track) {
			if (!this.trackIsValid()) {
				Ember.debug('unvalid track');
				return; }

			this.set('isAdding', false);
			Ember.debug('valid track');

			// Create a new track
			track = this.get('store').createRecord('track', {
				url: this.get('trackUrl'),
				title: this.get('trackTitle'),
				body: this.get('trackBody'),
				created: new Date().getTime()
			});

			// Reset the fields
			this.setProperties({
				trackUrl: '',
				trackTitle: '',
				trackBody: ''
			});

			var model = this.get('model');

			track.save().then(function() {
				Ember.RSVP.Promise.cast(model.get('tracks')).then(function(tracks) {
					tracks.addObject(track);
					model.save().then(function() {
						// success?
					}, function() {
						// error?
					});
				});
			});
		}
	}
});

export default PlaylistController;
