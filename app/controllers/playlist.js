import Ember from 'ember';

export default Ember.ObjectController.extend({
	isEditing: false,

	canEdit: function() {
		return this.get('model.user') === this.get('auth.user');
	}.property('model.user', 'auth.user'),

	actions: {
		edit: function() {
			this.set('isEditing', true);
		},
		cancel: function() {
			this.set('isEditing', false);
		},
		save: function() {
			var playlist = this.get('model');
			playlist.save().then(function(){
				Ember.debug('Saved playlist');
			});
			this.send('cancel');
		},
		tryDelete: function() {
			var playlist = this.get('model');
			var confirmed = confirm('Are you sure?');

			if (confirmed) {
				Ember.debug('Playlist deleted');
				playlist.destroyRecord();
				this.transitionToRoute('playlists');
			}
		},
		favorite: function() {
			var user = this.get('auth.user');
			var playlist = this.get('model');

			Ember.RSVP.Promise.cast(user.get('favoritePlaylists')).then(function(favorites) {
				favorites.addObject(playlist);
				user.save().then(function() {
					Ember.debug('Success: playlist saved as favorite on the user');
				});
			});
		}
	}
});
