var FirePlaylistComponent = Ember.Component.extend({
	classNames: ['playlist'],
	classNameBindings: ['isExpanded:playlist-expanded', 'isSingle:playlist-single'],
	trackUsername: '',
	trackBody: '',

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
				Ember.debug('not valid');
				return; }

			Ember.debug('valid');

			var store = this.get('store');

			// Create a new track
			var track = store.createRecord('track', {
				url: this.get('trackUrl'),
				title: this.get('trackTitle'),
				body: this.get('trackBody'),
				created: new Date().getTime()
				// ,user: promises.user
			});

			// Pass the action on to the playlist controller (see playlist.hbs)
			this.sendAction('onPublishTrack', this.get('playlist'), track);

			// Reset the fields
			this.setProperties({
				trackUrl: '',
				trackTitle: '',
				trackBody: ''
			});

			// Ember.RSVP.hash({
			// 	user: this.get('util').getUserByUsername(this.get('trackUsername'))
			// }).then(function(promises) {

			// }.bind(this));
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
