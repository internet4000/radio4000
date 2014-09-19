import Ember from 'ember';

export default Ember.ObjectController.extend({
	isEditing: false,

	// Checks if the current user id matches the user id on the playlist model
	// @todo make sure this works
	canEdit: function() {
		Ember.debug('can edit method');
		console.log( this.get('auth') );

		var user = this.get('auth.user');
		console.log(user);

		// this.store.find('playlist', userPlaylist).then(function(playlist){
		// 	console.log('hey yes');
		// 	console.log(playlist);
		// });

		// return this.get('auth.user.playlist') === this.get('model');
	}.on('init'),

	// canEdit: true,


	actions: {
		edit: function() {
			this.set('isEditing', true);
		},
		cancel: function() {
			this.set('isEditing', false);
		},
		save: function() {
			this.get('model').save().then(function(){
				// saved playlist
				this.send('cancel');
			});
		}
	}
});
