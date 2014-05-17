var FirePlaylistComponent = Ember.Component.extend({
	classNames: ['playlist'],
	classNameBindings: ['isExpanded:playlist-expanded', 'isSingle:playlist-single'],
	trackUsername: '',
	trackBody: '',
	isEditing: false,
	isOwner: 'from component',

	init: function () {
		this._super();
		this.authController = this.get('controllers.auth');
		this.checkOwner();
	},

	checkOwner: function() {
		var currentUserId = this.get('authController.currentUser.id');
		var playlistUserId = this.get('playlist.user.id');

		// Ember.debug(currentUserId);
		// Ember.debug(playlistUserId);
		if (currentUserId === playlistUserId) {
			this.set('isOwner', true);
			return true;
		} else {
			this.set('isOwner', false);
			return false;
		}
	},

	trackIsValid: function() {
		var isValid = true;
		['trackUrl', 'trackTitle', 'trackBody'].forEach(function(field) {
			if (this.get(field) === '') {
				isValid = false;
			}
		}, this);
		return isValid;
	},

	actions: {
		publishTrack: function() {
			if (!this.trackIsValid()) {
				Ember.debug('unvalid track');
				return; }

			Ember.debug('valid track');

			// Create a new track
			var track = this.get('store').createRecord('track', {
				url: this.get('trackUrl'),
				title: this.get('trackTitle'),
				body: this.get('trackBody'),
				created: new Date().getTime()
			});

			// Pass the action on to the playlist controller (see playlist.hbs)
			this.sendAction('onPublishTrack', this.get('playlist'), track);

			// Reset the fields
			this.setProperties({
				trackUrl: '',
				trackTitle: '',
				trackBody: ''
			});
		},

		editPlaylist: function() {
			this.set('isEditing', true);
		},
		stopEditing: function() {
			this.set('isEditing', false);
		},
		acceptChanges: function() {
			this.get('playlist').save();
		},
		removeTrack: function(track) {
			var playlist = this.get('playlist');
			Promise.cast(playlist.get('tracks')).then(function(tracks) {
				tracks.removeObject(track);
				track.destroyRecord();
				playlist.save();
			});
		}
	}
});

export default FirePlaylistComponent;
