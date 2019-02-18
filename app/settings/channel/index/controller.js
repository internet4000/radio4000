import Ember from 'ember'
import Controller from '@ember/controller'
import {get, set} from '@ember/object'
import {task} from 'ember-concurrency'
import slugify from 'radio4000/utils/slugify'
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
		const oldSlug = channel.get('slug')
		const newSlug = slugify(props.slug)
		const slugChanged = Boolean(props.slug) && newSlug !== oldSlug

		// Set new, cleaned slug if it is valid.
		if (slugChanged) {
			try {
				yield get(this, 'validateSlug').perform(newSlug)
				set(channel, 'slug', newSlug)
			} catch (err) {
				messages.warning(err)
				return
			}
		}

		// Merge changes/props onto the channel (except slug)
		delete props.slug
		Object.keys(props).forEach(prop => {
			channel.set(prop, props[prop])
		})

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
			const messages = get(this, 'flashMessages')
			const channel = get(this, 'model')

			if (!cloudinaryId) {
				throw new Error('Could not save image. Missing cloudinary id')
			}

			channel.set('image', cloudinaryId)

			return channel
				.save()
				.then(() => {
					debug('Saved channel with image')
				})
				.catch(() => {
					messages.warning('Could not save the image to your channel')
					channel.set('image', undefined)
				})
		},

		deleteImage() {
			set(this, 'model.image', undefined)
			return this.get('model').save()
		},

		goBack() {
			// Clear any unsaved changes.
			debug('clearing unsaved changes and going back to channel.index')
			get(this, 'model').rollbackAttributes()
			this.transitionToRoute('channel', get(this, 'model'))
		}
	}
})
