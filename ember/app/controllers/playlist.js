import Ember from 'ember';

export default Ember.ObjectController.extend({
	isEditing: false,
	isAdding: false,

	actions: {
		editPlaylist: function() {
			this.set('isEditing', true);
		},
		savePlaylist: function() {
			this.set('isEditing', false);
			this.get('model').save();
		},
		cancelEditing: function() {
			this.set('isEditing', false);
		}
	},

	// Checks if the current user id matches the user id on the playlist model
	checkOwner: function() {
		console.log('does this run');
		// var userId = this.get('auth.user.id'); // "10152422494934521"
		// var modelId = this.get('content.user.id');

		// if (userId === modelId) {
		// 	this.set('isOwner', true);
		// 	Ember.debug('TRUE MAN');
		// } else {
		// 	this.set('isOwner', false);
		// 	Ember.debug('MUCH FALSE');
		// }
	}
});
