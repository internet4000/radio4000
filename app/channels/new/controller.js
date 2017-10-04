import Ember from 'ember'
import clean from 'radio4000/utils/clean'
import randomText from 'radio4000/utils/random-text'
import { task } from 'ember-concurrency'
import { validator, buildValidations } from 'ember-cp-validations'
import channelConst from 'radio4000/utils/channel-const'

const { debug, warn, computed, get } = Ember

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
})

export default Ember.Controller.extend(Validations, {
	title: '',

	disableSubmit: computed.or(
		'validations.attrs.title.isInvalid',
		'createRadio.isRunning'
	),

	// cleans the slug from bad things and suffix it with a random string
	cleanSlug: computed('title', function() {
		return clean(this.get('title'))
	}),

	suffixSlug(slug) {
		const random = randomText()
		return `${slug}-${random}`
	},

	// This tasks calls the other one so we have one place to catch success/fail.
	createRadio: task(function*(event) {
		event.preventDefault()

		const messages = get(this, 'flashMessages')

		try {
			const channel = this.get('reallyCreateRadio').perform()
			this.transitionToRoute('channel', channel)
			messages.success('Voilà! You now have a Radio4000 📻', { timeout: 10000 })
		} catch (err) {
			debug(err)
			messages.warning('Sorry, could not create your radio')
		}
	}).drop(),

	reallyCreateRadio: task(function*(event) {
		const user = get(this, 'session.currentUser')
		const title = get(this, 'title').trim()
		let slug = get(this, 'cleanSlug')

		// If the slug is already taken, suffix it.
		try {
			const query = yield this.store.query('channel', {
				orderBy: 'slug',
				equalTo: slug
			})
			const slugExists = query.get('firstObject')
			if (slugExists) {
				slug = this.suffixSlug(slug)
			}
		} catch (err) {
			throw new Error(err)
		}

		// Save the channel, create channel public and relationships, save again
		const channel = this.store.createRecord('channel', { title, slug })

		try {
			yield channel.validate()
		} catch (err) {
			throw new Error('Could not validate the channel')
		}

		try {
			yield channel.save()
		} catch (err) {
			throw new Error('Could not save channel')
		}

		const userChannels = yield user.get('channels')
		userChannels.addObject(channel)

		try {
			yield user.save()
		} catch (err) {
			throw new Error('Could not save user')
		}

		const channelPublic = this.store.createRecord('channelPublic', {channel})

		try {
			yield channelPublic.save()
		} catch (err) {
			throw new Error('Could not save channelPublic')
		}

		try {
			channel.setProperties({ channelPublic })
			yield channel.save()
		} catch (e) {
			throw new Error('Could not save new channel')
		}
		return channel
	}).drop()
})
