import Ember from 'ember'
import Controller from '@ember/controller';
import {get, set} from '@ember/object'
import {task} from 'ember-concurrency'
import clean from 'radio4000/utils/clean'
import ValidateSlug from 'radio4000/mixins/validate-slug'

const { debug } = Ember

export default Controller.extend(ValidateSlug, {
	// Props is an object with changes to be merged onto the channel.
	// If slug changed, it will be validated and on success we transition the URL.
	saveChannelDetails: task(function*(props) {
		const messages = get(this, 'flashMessages')
		const channel = get(this, 'model')

		// If nothing changed we return with a notification
		const changes = Object.keys(props).length > 0
		if (!changes && !channel.get('hasDirtyAttributes')) {
			messages.info('Saved', {timeout: 1000}) // not really, but ux
			return
		}

		// Check if slug changed (before merging)
		const slugChanged =
			props.slug && clean(props.slug) !== get(this, 'channel.slug')

		// Merge changes (props) onto the channel.
		Object.assign(channel, props)

		// Validate channel.
		try {
			yield channel.validate()
		} catch (err) {
			throw new Error('The channel is not valid')
		}

		// Validate slug.
		const newSlug = clean(channel.get('slug'))
		if (slugChanged) {
			try {
				yield get(this, 'validateSlug').perform(newSlug)
				channel.set('slug', newSlug)
			} catch (err) {
				messages.warning(err)
				return
			}
		}

		// Save the channel.
		try {
			yield channel.save()
			messages.success('Saved channel')

			// We have to transition if the slug changed. Otherwise reloading is a 404.
			if (slugChanged) {
				set(this, 'initialSlug', channel.get('slug'))
				debug('refreshing because slug changed')
				this.transitionToRoute('channel.edit', channel.get('slug'))
			}
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
