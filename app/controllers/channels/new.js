import Ember from 'ember';
import clean from 'radio4000/utils/clean';

export default Ember.Controller.extend({

	titleMaxLength: 32,

	actions: {
		// make sure the title has the right length
		checkCreate: function() {
			if(this.get('model.title.length') <= this.titleMaxLength) {
				// good we can create the channel
				this.send('create');
			} else {
				// console.log(this.get('model.title.length'));
			}
		},

		create: function() {
			var user = this.get('session.user');
			var channel = this.get('model');

			// we need a user
			if (!user) {
				Ember.warn('No user.');
				return false;
			}

			channel.setProperties({
				slug: this.get('cleanSlug'),
				created: new Date().getTime()
			}).save().then(function(channel) {
				// now the channel is saved

				// set relationship on user
				user.get('channels').then(function(channels) {
					channels.addObject(channel);
					user.save();
				});

				// @todo refactor: set the user channel (should be automatic)
				// (otherwise index will be blank because we only set on login)
				this.set('session.userChannel', channel);
			}.bind(this));

			// Redirect to the new channel
			Ember.debug('redirect to the new channel');
			this.transitionToRoute('channel', channel);
		}
	},

	cleanSlug: function() {
		var cleaned = clean(this.get('model.title'));
		return cleaned + '-' + this.getRandomText();
	}.property('title'),

	// Returns a random string
	getRandomText: function() {
		var text = "";
		var possible = "0ab1cd2ef3gh4ij5kl6mn7op8q9rstuvwxyz";

		for (var i=0; i<4; i++) {
			text += possible.charAt(Math.floor(Math.random() * possible.length));
		}

		return text;
	}
});
