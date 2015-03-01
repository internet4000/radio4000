import Ember from 'ember';
import clean from 'radio4000/utils/clean';

export default Ember.Controller.extend({
	cleanSlug: function() {
		var cleaned = clean(this.get('model.title'));
		return cleaned + '-' + this.getRandomText();
	}.property('title'),

	actions: {
		createChannel: function() {
			var channel = this.get('model');
			var title = channel.get('title');
			var user = this.get('session.user');

			// we need a title
			if (title === '') {
				Ember.warn('No title.');
				return false;
			}

			// we need a user
			if (!user) {
				Ember.warn('No user.');
				return false;
			}

			// set and save
			channel.setProperties({
				user: user,
				slug: this.get('cleanSlug'),
				created: new Date().getTime()
			}).save();

			// set relationship on user
			user.get('channels').then(function(channels) {
				channels.addObject(channel);
				user.save();
			});

			// set the user channel
			// (otherwise index will be blank because we only set on login)
			this.set('session.userChannel', channel);

			// Redirect to the new channel
			this.transitionToRoute('channel', channel);
		}
	},

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
