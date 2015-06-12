import Ember from 'ember';
import clean from 'radio4000/utils/clean';
import randomText from 'radio4000/utils/random-text';
import channelConst from 'radio4000/utils/channel-const';

const { debug, computed } = Ember;

export default Ember.Controller.extend({
	titleMaxLength: channelConst.titleMaxLength,
	titleMinLength: channelConst.titleMinLength,
	isSaving: false,
	titleError: false,
	newRadioTitle: '',

	cleanSlug: computed('model.title', function() {
		let random = randomText();
		let title = this.get('newRadioTitle');

		title = clean(title);
		title = title.trim();

		return `${title}-${random}`;
	}),

	titleValidate: computed('newRadioTitle', function() {
		// check channel.title.length, if not in our size limit, return NOPE
		const titleLength = this.get('newRadioTitle.length');
		const tooLong = titleLength >= this.get('titleMaxLength');
		const tooShort = titleLength < this.get('titleMinLength');

		if (tooLong) {
			debug('Title is too long');
			this.set('titleError', true);
			return false;
		} else if (tooShort) {
			debug('Title is too short');
			this.set('titleError', true);
			return false;
		} else {
			debug('Title has the right length');
			this.set('titleError', false);
			return true;
		}
	}),

	userCanCreateRadio: computed('titleValidate', 'session.currentUser', function() {
		if (!this.get('session.currentUser')) {
			debug('userCanCreateRadio fails, no user');
			return false;
		} else if (!this.get('titleValidate')) {
			debug('userCanCreateRadio fails, title not right size');
			return false;
		} else {
			debug('userCanCreateRadio sucess! title has the right size and there is a user');
			return true;
		}
	}),

	actions: {
		create() {
			const radioTitle = this.get('newRadioTitle');
			const user = this.get('session.currentUser');

			const channel = this.store.createRecord('channel', {
				title: radioTitle.trim()
			});
			const slug = this.get('cleanSlug');

			if (!this.get('userCanCreateRadio')) {
				Ember.warn('user cannot create radio');
				return false;
			}

			this.set('isSaving', true);

			channel.save().then((channel) => {
				// now the channel is saved
				debug('saved channel');

				// set relationship on user (who created the channel)
				user.get('channels').then((channels) => {

					channels.addObject(channel);
					user.save().then(() => {
						debug('Saved channel on user.');

						// create public channel
						this.store.createRecord('channelPublic', {
							channel: channel
						}).save().then((channelPublic) => {

							// now the channelPublic is saved, has an ID and can be used
							debug('saved channelPublic');

							// set channel slug and relationship
							channel.setProperties({
								slug: slug,
								channelPublic: channelPublic
							});

							// save it
							channel.save().then((channel) => {
								// Redirect to the new channel
								debug('redirect to the new channel');
								this.transitionToRoute('channel', channel);
								this.set('isSaving', false);
							});
						});
					});

					// clean new radio (title) input
					this.set('newRadioTitle', '');
				});
			});
		}
	}
});
