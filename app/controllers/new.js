import Ember from 'ember';

export default Ember.ObjectController.extend({
	cleanSlug: function() {
		return this.get('title').dasherize() + '-' + this.getRandomText();
	}.property('title'),

	actions: {
		createChannel: function() {
			var _this = this;
			var channel = this.get('model');
			var title = this.get('title');
			var user = this.get('session.user');

			// we need a title
			if (title === '') {
				Ember.warn('no title');
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

	// slugIsTaken: function() {
	// 	var _this = this;
	// 	var slug = this.get('slug');
	// 	var canIHazSlug = true;

	// 	return this.store.find('channel').then(function(channels) {
	// 		return channels.forEach(function(channel) {
	// 			if (channel.get('slug') === slug) {
	// 				return false;
	// 			}
	// 		});
	// 	});
	// },
});
