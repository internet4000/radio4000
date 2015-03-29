import Ember from 'ember';
import clean from 'radio4000/utils/clean';
import randomText from 'radio4000/utils/random-text';

export default Ember.Controller.extend({
	titleMaxLength: 32,

	tooLong: Ember.computed('model.title', function() {
		return this.get('model.title.length') >= this.get('titleMaxLength');
	}),

	actions: {
		create() {
			var user = this.get('session.user');
			var channel = this.get('model');

			// validate
			if (this.get('tooLong')) {
				return;
			}

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

					// @todo refactor: set the user channel (should be automatic)
					// (otherwise index will be blank because we only set on login)
					this.set('session.userChannel', channel);

					// Redirect to the new channel
					Ember.debug('redirect to the new channel');
					this.transitionToRoute('channel', channel);
				}.bind(this));

			}.bind(this));
		}
	},

	cleanSlug: Ember.computed('title', function() {
		var cleaned = clean(this.get('model.title'));
		return cleaned + '-' + randomText();
	})
});
