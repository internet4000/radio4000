import Ember from 'ember';

export default Ember.ObjectController.extend({
	canEdit: false,
	isEditing: false,

	actions: {
		edit: function() {
			this.set('isEditing', true);
		},
		cancel: function() {
			this.set('isEditing', false);
		},
		save: function() {
			this.get('model').save();
			this.send('cancel');
		}
	},

	// Checks if the current user id matches the user id on the playlist model
	checkAuth: function() {
		if (this.get('model.uid') === this.get('auth.user.id')) {
			this.set('canEdit', true);
		} else {
			this.set('canEdit', false);
		}
	}.observes('model', 'auth.user')
});
