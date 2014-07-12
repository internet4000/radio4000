var PlaylistController = Ember.ObjectController.extend({
	needs: ['auth'],
	isEditing: false,
	isAdding: false,
	isOwner: false,
	oskar: 'oskar initial',

	test: function() {
		console.log('HEJ');
	}.property('this.oskar'),

	init: function () {
		this._super();
		// Ember.debug(this.get('oskar'));
		// this.authController = this.get('controllers.auth');
	},

	// Checks if the current user id matches the user id on the playlist model
	checkOwner: function() {
		console.log('does this run');
		// var userId = this.get('controllers.auth.currentUser.id'); // "10152422494934521"
		// var modelId = this.get('content.user.id');

		// if (userId === modelId) {
		// 	this.set('isOwner', true);
		// 	Ember.debug('TRUE MAN');
		// } else {
		// 	this.set('isOwner', false);
		// 	Ember.debug('MUCH FALSE');
		// }
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
