import Ember from 'ember';
import clean from 'radio4000/utils/clean';
import randomText from 'radio4000/utils/random-text';
import channelConst from 'radio4000/utils/channel-const';

const { debug, computed } = Ember;

export default Ember.Controller.extend({
	title: '',
	titleMaxLength: channelConst.titleMaxLength,
	titleMinLength: channelConst.titleMinLength,
	isSaving: false,
	showValidation: false, // because we don't want it to show before clicking

	cleanSlug: computed('title', function() {
		let title = clean(this.get('title'));
		let random = randomText();

		return `${title}-${random}`;
	}),

	// check channel.title.length, if not in our size limit, return NOPE
	isValid: computed('title', function() {
		const titleLength = this.get('title.length');
		const tooLong = titleLength >= this.get('titleMaxLength');
		const tooShort = titleLength < this.get('titleMinLength');

		if (!tooLong && !tooShort) {
			debug('Title has the right length');
			return true;
		} else {
			debug('Title is either too long or short');
			return false;
		}
	}),

	actions: {
		create() {
			let slug = this.get('cleanSlug');
			let title = this.get('title');

			this.set('showValidation', true);

			if (!this.get('isValid')) {
				return;
			}

			debug(title);
			debug(title.trim());

			title = title.trim();

			debug('can create?');

			// create channel and start saving
			const channel = this.store.createRecord('channel', {
				title: title,
				slug: slug
			});

			this.set('isSaving', true);
			this.send('saveChannel', channel);
		}
	}
});
