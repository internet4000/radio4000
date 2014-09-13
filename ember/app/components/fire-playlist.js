import Ember from 'ember';

export default Ember.Component.extend({
	// classNames: ['playlist'],
	// classNameBindings: ['isExpanded:playlist-expanded', 'isSingle:playlist-single'],
	isEditing: false,

	/*checkOwner: function() {
		var userId = this.get('auth.user.id');
		var playlistUserId = this.get('playlist.user.id');

		Ember.debug(userId);
		Ember.debug(playlistUserId);
		if (userId === playlistUserId) {
			this.set('isOwner', true);
			return true;
		} else {
			this.set('isOwner', false);
			return false;
		}
	},*/

	actions: {
		publishTrack: function() {

			if (!this.trackIsValid()) {
				Ember.debug('unvalid track');
				return;
			} else {
				Ember.debug('valid track');
				this.createTrack();
			}
		},
		editPlaylist: function() {
			this.set('isEditing', true);
		},
		savePlaylist: function() {
			this.set('isEditing', false);
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
	},

	createTrack: function() {
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

		console.log('created a track');
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
});
