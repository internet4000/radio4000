import Ember from 'ember';

export default Ember.ObjectController.extend({
	needs: ['playlist'],
	isEditingSlug: false,

	validateSlug: function() {
		var canIHazSlug = true;
		var currentPlaylist = this.get('model');
		// dasherize turns spaces into dashes and makes it lowercase
		var newSlug = this.get('slug').dasherize();

		// make sure the new one isn't empty
		if (newSlug === '') {
			alert("Hey, the URL can't be empty. Please enter the URL you'd like your playlist to have. If you have no idea, just enter the title.");
			return false;
		}

		this.store.find('playlist').then(function(playlists) {
			playlists.forEach(function(playlist) {

				// If any other playlist has the same slug, abort!
				if (playlist !== currentPlaylist && playlist.get('slug') === newSlug) {
					alert('Sorry, that URL is already taken. Please choose another one.');
					canIHazSlug = false;
				}
			});

			if (canIHazSlug) {
				this.set('slug', newSlug);
				console.log('setting slug to' + newSlug);
				this.set('isEditingSlug', false);
				this.get('controllers.playlist').send('save');
			} else {
				console.log('reverting slug to' + this.get('savedSlug'));
				this.set('slug', this.get('savedSlug')); // revert to old slug
			}

		}.bind(this));
	},



	actions: {
		editSlug: function() {
			this.set('isEditingSlug', true);
			this.set('savedSlug', this.get('slug')); // save it for later
		},
		trySave: function() {
			// Make sure slug is clean
			this.validateSlug();
		}
	}
});
