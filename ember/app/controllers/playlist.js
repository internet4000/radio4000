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

	actions: {
		editPlaylist: function() {
			this.set('isEditing', true);
		},
		saveEditing: function() {
			this.set('isEditing', false);
			this.get('model').save();
		},
		cancelEditing: function() {
			this.set('isEditing', false);
		}
	}
});

export default PlaylistController;
