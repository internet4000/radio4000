import Ember from 'ember';
import clean from 'radio4000/utils/clean';
import randomText from 'radio4000/utils/random-text';
import channelConst from 'radio4000/utils/channel-const';

const {debug, computed} = Ember;

export default Ember.Controller.extend({
	title: '',
	titleMaxLength: channelConst.titleMaxLength,
	titleMinLength: channelConst.titleMinLength,
	isSaving: false,
	// because we don't want it to show before clicking
	didCreate: false,

	cleanSlug: computed('title', function () {
		let title = clean(this.get('title'));
		let random = randomText();

		return `${title}-${random}`;
	}),

	isTitleTooShort: computed('title', function () {
		return this.get('title.length') < this.get('titleMinLength');
	}),

	isTitleTooLong: computed('title', function () {
		return this.get('title.length') >= this.get('titleMaxLength');
	}),

	// check channel.title.length, if not in our size limit, return NOPE
	titleIsValid: computed('title', function () {
		return !this.get('isTitleTooShort') && !this.get('isTitleTooLong');
	}),

	actions: {
		create() {
			let slug = this.get('cleanSlug');
			let title = this.get('title');

			this.set('didCreate', true);

			if (!this.get('titleIsValid')) {
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
