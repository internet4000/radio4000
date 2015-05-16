import Ember from 'ember';
import clean from 'radio4000/utils/clean';
import randomText from 'radio4000/utils/random-text';

export default Ember.Controller.extend({
	titleMaxLength: 33,
	titleMinLength: 4,
	isSaving: false,
	titleError: false,

	newRadioTitle: '',

	cleanSlug: Ember.computed('model.title', function() {
		let random = randomText();
		let title = this.get('newRadioTitle');

		title = clean(title);

		return `${title}-${random}`;
	}),

	titleValidate: Ember.computed('newRadioTitle', function() {
		// check channel.title.length, if not in our size limit, return NOPE
		const titleLength = this.get('newRadioTitle.length');
		const tooLong = titleLength >= this.get('titleMaxLength');
		const tooShort = titleLength < this.get('titleMinLength');

		if (tooLong) {
			Ember.debug('Title is too long');
			this.set('titleError', true);
			return false;
		} else if (tooShort) {
			Ember.debug('Title is too short');
			this.set('titleError', true);
			return false;
		} else {
			Ember.debug('Title has the right length');
			this.set('titleError', false);
			return true;
		}
	}),

	userCanCreateRadio: Ember.computed('titleValidate', 'session.currentUser', function() {
		if (!this.get('session.currentUser')) {
			Ember.debug('userCanCreateRadio fails, no user');
			return false;
		} else if (!this.get('titleValidate')) {
			Ember.debug('userCanCreateRadio fails, title not right size');
			return false;
		} else {
			Ember.debug('userCanCreateRadio sucess! title has the right size and there is a user');
			return true;
		}
	}),

	actions: {
		create() {
			const radioTitle = this.get('newRadioTitle');
			const user = this.get('session.currentUser');
			const channel = this.store.createRecord('channel', {
				title: radioTitle
			});
			const slug = this.get('cleanSlug');

			if (!this.get('userCanCreateRadio')) {
				Ember.warn('user cannot create radio');
				return false;
			}


			this.set('isSaving', true);

			// create public channel
			this.store.createRecord('channelPublic', {
				channel: channel
			}).save().then((channelPublic) => {

				// now the channelPublic is saved, has an ID and can be used
				Ember.debug('saved channelPublic');

				// set channel slug and relationship
				channel.setProperties({
					slug: slug,
					channelPublic: channelPublic
				});

				// save it
				channel.save().then((channel) => {

					// now the channel is saved
					Ember.debug('saved channel');

					// set relationship on user (who created the channel)
					user.get('channels').then((channels) => {

						channels.addObject(channel);
						user.save().then(() => {
							Ember.debug('Saved channel on user.');
						});

						// clean new radio (title) input
						this.set('newRadioTitle', '');

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
