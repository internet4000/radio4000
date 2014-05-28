var PlaylistController = Ember.ObjectController.extend({
	needs: ['auth'],
	isEditing: false,
	isAdding: false,
	isOwner: false,

	// Checks if the current user id matches the user id on the playlist model
	// DOERSNT
	checkOwner: function() {
		var userId = this.get('controllers.auth.currentUser.id');
		var modelId = this.get('content.user.id');

		console.log(this.get('content'));
		console.log(this.get('model'));

		if (userId === modelId) {
			this.set('isOwner', true);
			Ember.debug('TRUE MAN');
		} else {
			this.set('isOwner', false);
			Ember.debug('MUCH FALSE');
		}
	},

	init: function () {
		this._super();
		this.authController = this.get('controllers.auth');

		// this.checkOwner();
	},

	trackIsValid: function() {
		var isValid = true;
		['trackTitle','trackUrl'].forEach(function(field) {
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
