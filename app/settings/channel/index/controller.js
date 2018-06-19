import Ember from 'ember'
import Controller from '@ember/controller'
import {get} from '@ember/object'
import {task} from 'ember-concurrency'
import clean from 'radio4000/utils/clean'
import ValidateSlug from 'radio4000/mixins/validate-slug'

const {debug} = Ember

export default Controller.extend(ValidateSlug, {
	// Props is an object with changes to be merged onto the channel.
	// If slug changed, it will be validated and on success we transition the URL.
	saveChannelDetails: task(function * (props) {
		const messages = get(this, 'flashMessages')
		const channel = get(this, 'model')

		// If nothing changed we return with a notification
		const changes = Object.keys(props).length > 0
		if (!changes && !channel.get('hasDirtyAttributes')) {
			messages.info('No changes to save', {timeout: 1000})
			return
		}

		// Check if slug changed (before merging)
		const slug = channel.get('slug')
		const newSlug = clean(props.slug)
		const slugChanged = Boolean(props.slug) && newSlug !== slug

		// Validate slug.
		if (slugChanged) {
			try {
				yield get(this, 'validateSlug').perform(newSlug)
				channel.set('slug', newSlug)
			} catch (err) {
				messages.warning(err)
				return
			}
		}

		// Merge changes (props) onto the channel.
		if (props.title) channel.set('title', props.title)
		if (props.body) channel.set('body', props.body)
		if (props.link) channel.set('link', props.link)

		// Validate the model.
		const isValid = channel.get('validations.isValid')
		if (!isValid) {
			messages.warning('Could not save. Channel is not valid')
			return
		}

		// Save the channel.
		try {
			yield channel.save()
			let msg = `Saved channel`
			if (slugChanged) {
				msg = `${msg}. It's now available at https://radio4000.com/${newSlug}`
			}
			messages.success(msg)
		} catch (err) {
			messages.warning(`Sorry, we couldn't save your radio.`)
			throw new Error(err)
		}
	}).keepLatest(),

	actions: {
		saveImage(cloudinaryId) {
			if (!cloudinaryId) {
				throw new Error('Could not save image. Missing cloudinary id')
			}
			const channel = get(this, 'model')
			const image = this.store.createRecord('image', {
				src: cloudinaryId,
				channel
			})
			// save and add it to the channel
			return image
				.save()
				.then(image => {
					channel.get('images').addObject(image)
					channel.save().then(() => {
						debug('Saved channel with image')
					})
				})
				.catch(err => {
					Ember.debug('could not save image', err)
				})
		},

		deleteImage() {
			return this.get('model.coverImage').destroyRecord()
		},

		goBack() {
			// Clear any unsaved changes.
			debug('clearing unsaved changes and going back to channel.index')
			get(this, 'model').rollbackAttributes()
			this.transitionToRoute('channel', get(this, 'model'))
		}
	}
})
