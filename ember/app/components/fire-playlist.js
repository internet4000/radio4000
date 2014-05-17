var FirePlaylistComponent = Ember.Component.extend({
	classNames: ['playlist'],
	classNameBindings: ['isExpanded:playlist-expanded', 'isSingle:playlist-single'],
	trackUsername: '',
	trackBody: '',
	isEditing: false,

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
			console.log(this.get('playlist'));
		},
		acceptChanges: function() {
			this.get('playlist').save();
		},
		saveChanges: function() {
			this.set('isEditing', false);
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
