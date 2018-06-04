import Controller from '@ember/controller';
import { task } from 'ember-concurrency'
import clean from 'radio4000/utils/clean'
import ValidateSlug from 'radio4000/mixins/validate-slug'
import Ember from 'ember'
import {get, set} from '@ember/object'

const { debug } = Ember

export default Controller.extend(ValidateSlug, {
	// Used to cache the initial slug  Comes from the route's setupController.
	initialSlug: undefined,

	// Props is an optional object with changes.
	saveChannelDetails: task(function * (props) {
		const messages = get(this, 'flashMessages')
		const channel = get(this, 'model')

		if (props) {
			// Merge props into the channel object.
			Object.assign(channel, props)
		} else if (!channel.get('hasDirtyAttributes')) {
			// If nothing changed there's no need to save.
			debug('nothing changed')
			return this.send('goBack')
		}

		// Check form validation.
		try {
			yield channel.validate()
		} catch (err) {
			throw new Error('The channel is not valid')
		}

		// Check if the cleaned slug is different from original slug.
		// If so, validate it.
		const initialSlug = get(this, 'initialSlug')
		const cleanedSlug = clean(channel.get('slug'))
		const slugChanged = initialSlug !== cleanedSlug
		if (slugChanged) {
			try {
				yield get(this, 'validateSlug').perform(cleanedSlug)
			} catch (err) {
				messages.warning(err)
				return
			}
			// Set the cleaned slug.
			channel.set('slug', cleanedSlug)
		}

		// Actually save the channel.
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

	saveCoordinates: task(function * (lat, lng) {
		const channel = get(this, 'model')
		channel.setProperties({
			coordinatesLatitude: lat,
			coordinatesLongitude: lng
		})
		yield channel.save()
	}).drop(),

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
