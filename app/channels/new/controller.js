import Ember from 'ember';
import clean from 'radio4000/utils/clean';
import randomText from 'radio4000/utils/random-text';

export default Ember.Controller.extend({
	titleMaxLength: 32,
	titleMinLength: 4,

	cleanSlug: Ember.computed('model.title', function() {
		var title = this.get('model.title');
		return clean(title) + '-' + randomText();
	}),

	tooLong: Ember.computed('model.title', function() {
		return this.get('model.title.length') >= this.get('titleMaxLength');
	}),

	validates: Ember.computed('tooLong', 'session.currentUser', function() {
		return !this.get('tooLong') || !this.get('session.currentUser');
	}),

	actions: {
		create() {

			if (!this.get('validates')) {
				Ember.warn('Channel did not validate.');
				return false;
			}

			var user = this.get('session.currentUser');
			var channel = this.get('model');
			var slug = this.get('cleanSlug');

			this.set('isSaving', true);

			// create public channel
			this.store.createRecord('channelPublic', {
				channel: channel
			}).save().then((channelPublic) => {

				// now the channelPublic is saved, has an ID and can be used
				console.log('saved channelPublic');

				// set channel slug and relationship
				channel.setProperties({
					slug: slug,
					channelPublic: channelPublic
				});

				// save it
				channel.save().then((channel) => {

					// now the channel is saved
					console.log('saved channel');

					// set relationship on user (who created the channel)
					user.get('channels').then((channels) => {

						channels.addObject(channel);
						user.save().then(() => {
							console.log('Saved channel on user.');
						});

						// Redirect to the new channel
						Ember.debug('redirect to the new channel');
						this.transitionToRoute('channel', channel);
						this.set('isSaving', false);
					});
				});
			});
		}
	}
});
