import Ember from 'ember';
import clean from 'radio4000/utils/clean';
import randomText from 'radio4000/utils/random-text';
import {task} from 'ember-concurrency';
import {validator, buildValidations} from 'ember-cp-validations';
import channelConst from 'radio4000/utils/channel-const';

const {debug, computed, get} = Ember;

// This is copy/paste from channel model because we need to validate
// a `title` field without using a full channel model.
const Validations = buildValidations({
	title: [
		validator('presence', true),
		validator('length', {
			min: channelConst.titleMinLength,
			max: channelConst.titleMaxLength
		})
	]
});

export default Ember.Controller.extend(Validations, {
	title: '',

	disableSubmit: computed.or('validations.attrs.title.isInvalid', 'createRadio.isRunning'),

	// cleans the slug from bad things and suffix it with a random string
	cleanSlug: computed('title', function () {
		return clean(this.get('title'));
	}),

	suffixSlug(slug) {
		const random = randomText();
		return `${slug}-${random}`;
	},

	createRadio: task(function * (event) {
		event.preventDefault();
		const messages = get(this, 'flashMessages');
		const user = get(this, 'session.currentUser');
		const title = get(this, 'title').trim();
		let slug = get(this, 'cleanSlug');

		// If the slug is already taken, suffix it.
		try {
			const query = yield this.store.query('channel', {
				orderBy: 'slug',
				equalTo: slug
			});
			const slugExists = query.get('firstObject');
			if (slugExists) {
				slug = this.suffixSlug(slug);
			}
		} catch (err) {
			debug(err);
		}

		// Save the channel, create channel public and relationships, save again
		const channel = this.store.createRecord('channel', {title, slug});

		yield channel.validate().then(() => {
			debug('valid channel');
		}).catch(() => {
			debug('invalid channel');
		});

		yield channel.save();

		const userChannels = yield user.get('channels');
		userChannels.addObject(channel);
		yield user.save();

		const channelPublic = this.store.createRecord('channelPublic', {channel});
		yield channelPublic.save();

		try {
			channel.setProperties({channelPublic});
			yield channel.save();
			this.transitionToRoute('channel', channel);
			messages.warning('Voilà! You now have a Radio4000 📻', {timeout: 10000});
		} catch (e) {
			throw new Error('Could not save new channel');
		}
	}).drop()
});
