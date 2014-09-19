import Ember from 'ember';

export default Ember.ObjectController.extend({
	isEditing: false,

	canEdit: function() {
		return this.get('auth.user.playlist') === this.get('model');
	}.property('model', 'auth'),

	actions: {
		edit: function() {
			this.set('isEditing', true);
		},
		cancel: function() {
			this.set('isEditing', false);
		},
		save: function() {
			this.get('model').save().then(function(){
				// after saving the playlist
				this.send('cancel');
			});
		},
		addToFavorite: function() {
			console.log(auth.user.favouritePlaylists);
			return this.get('auth.user.favouritePlaylists');
		}
	}
});
