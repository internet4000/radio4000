import Ember from 'ember';

export default Ember.ObjectController.extend({
	needs: ['channel'],
	// isEditingSlug: false,

	validateSlug: function() {
		var canIHazSlug = true;
		var currentPlaylist = this.get('model');
		// dasherize turns spaces into dashes and makes it lowercase
		var newSlug = this.get('slug').dasherize();

		// make sure the new one isn't empty
		if (newSlug === '') {
			alert("Hey, the URL can't be empty. Please enter the URL you'd like your channel to have. If you have no idea, just enter the title.");
			return false;
		}

		this.store.find('channel').then(function(channels) {
			channels.forEach(function(channel) {

				// If any other channel has the same slug, abort!
				if (channel !== currentPlaylist && channel.get('slug') === newSlug) {
					alert('Sorry, that URL is already taken. Please choose another one.');
					canIHazSlug = false;
				}
			});

			if (canIHazSlug) {
				this.set('slug', newSlug);
				Ember.debug('Setting slug to: ' + newSlug);
				// this.set('isEditingSlug', false);
				this.get('controllers.channel').send('save');
			} else {
				Ember.debug('Reverting slug to: ' + this.get('savedSlug'));
				this.set('slug', this.get('savedSlug')); // revert to old slug
			}

		}.bind(this));
	},

	actions: {
		// editSlug: function() {
		// 	this.set('isEditingSlug', true);
		// 	this.set('savedSlug', this.get('slug')); // save it for later
		// },
		trySave: function() {
			// Make sure slug is clean
			this.validateSlug();
		},
		cancel: function() {
			// leaving the route also sets isexpanded to false
			this.transitionToRoute('channel', this.get('model'));
		}
	}
});
