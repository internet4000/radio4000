import Ember from 'ember';

export default Ember.ObjectController.extend({
	initialize: function() {
		this._super();
		console.log( this.get('model.title') );
	},

	actions: {
		newPlaylist: function() {
			if (!this.playlistIsValid()) { return false; }
			this.createPlaylist();
		}
	},

	// Make sure the form fields aren't empty
	playlistIsValid: function() {
		var isValid = true;
		['title', 'body'].forEach(function(field) {
			if (this.get(field) === '') {
				isValid = false;
			}
		}, this);
		Ember.debug(isValid);
		return isValid;
	},

	// Create a new playlist
	createPlaylist: function() {
		var newPlaylist = this.get('store').createRecord('playlist', {
			title: this.get('title'),
			body: this.get('body'),
			slug: this.get('slug'),
			image: this.get('image'),
			created: new Date().getTime(),
			user: this.get('auth.user.id')
		}).save();

		// this.transitionToRoute('playlist', playlist);
		this.transitionToRoute('playlists');

		// // and then save the same playlist into the user
		// then(function() {
		// Ember.RSVP.Promise.cast(user.get('playlists')).then(function(playlists) {
		// 	playlists.addObject(playlist);
		// 	user.save().then(function() {
		// 		// success?
		// 	}, function() {
		// 		// error?
		// 	});
		// });

		// // Empty the form fields
		// this.setProperties({
		// 	'playlist.title': '',
		// 	'playlist.body': '',
		// 	'playlist.image': '',
		// 	'playlist.slug': ''
		// });
	}
});
