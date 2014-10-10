import Ember from 'ember';

export default Ember.ObjectController.extend({
	actions: {
		newPlaylist: function() {
			if (this.validPlaylist) {
				this.createNewPlaylist();
			}
		}
	},

	// Makes sure the form fields aren't empty
	validPlaylist: function() {
		var isValid = true;
		['title'].forEach(function(field) {
			if (this.get(field) === '') {
				isValid = false;
			}
		}, this);
		Ember.debug(isValid);
		return isValid;
	},

	// Create a new playlist
	createNewPlaylist: function() {
		Ember.debug('createNewPlaylist');

		var user = this.get('auth.user');

		var newPlaylist = this.store.createRecord('playlist', {
			title: this.get('title'),
			slug: this.get('title').dasherize(),
			body: this.get('body'),
			created: new Date().getTime(),
			user: promises.user
		});

		newPlaylist.save().then(function() {
			Ember.debug('playlist saved');
			this.transitionToRoute('playlist', newPlaylist);
		}.bind(this), function() {
			Ember.debug('could not save playlist');
		});

		user.get('playlists').then(function(playlists) {
			playlists.addObject(newPlaylist);
			user.save().then(function() {
				Ember.debug('user saved');
			});
		});
	}
});
