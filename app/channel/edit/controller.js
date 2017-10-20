import Ember from 'ember'
import { task } from 'ember-concurrency'
import clean from 'radio4000/utils/clean'
import reservedUrls from 'radio4000/utils/reserved-urls'

const { Controller, computed, debug, get, set} = Ember

export default Controller.extend({
	cleanedSlug: computed('model.slug', function () {
		return clean(get(this, 'model.slug'))
	}),

	slugIsReserved: computed('cleanedSlug', function () {
		const cleanedSlug = get(this, 'cleanedSlug')
		return reservedUrls.any(reservedSlug => reservedSlug === cleanedSlug)
	}),

	validateSlug: task(function * () {
		const slug = get(this, 'cleanedSlug')

		// Check if slug is reserved.
		if (get(this, 'slugIsReserved')) {
			throw new Error(`The slug "${slug}" is reserved`)
		}

		// Check if the slug is already taken by another channel.
		const query = yield this.store.query('channel', {
			orderBy: 'slug',
			equalTo: slug
		})
		if (query.get('firstObject')) {
			throw new Error(`The slug "${slug}" is already taken`)
		}

		debug('slug is free')
		return slug
	}),

	saveChannel: task(function * () {
		const messages = get(this, 'flashMessages')
		const channel = get(this, 'model')
		const slug = get(channel, 'slug')
		const initialSlug = get(this, 'initialSlug')

		// If nothing changed there's no need to save.
		if (!channel.get('hasDirtyAttributes')) {
			debug('nothing changed')
			this.send('goBack')
			return
		}

		// Check form validation.
		try {
			yield channel.validate()
		} catch (err) {
			debug('form validation failed')
			console.log(err)
			throw new Error('channel form is not valid')
		}

		// If the slug changed, we need to validate it as well.
		if (initialSlug !== slug) {
			try {
				const validSlug = yield get(this, 'validateSlug').perform()
				channel.set('slug', validSlug)
				this.set('shouldRefresh', true)
			} catch (err) {
				console.log(err)
				messages.warning(err)
				return
			}
		}

		try {
			yield channel.save()
			debug('saved channel')
			messages.success('Saved channel')
			// We have to transition if the slug changed. Otherwise reloading is a 404.
			if (get(this, 'shouldRefresh')) {
				set(this, 'shouldRefresh', false)
				set(this, 'initialSlug', channel.get('slug'))
				debug('refreshing because slug changed')
				this.transitionToRoute('channel.edit', channel.get('slug'))
			}
		} catch (err) {
			console.log(err)
			debug('could not save channel')
			messages.warning(`Sorry, we couldn't save your radio.`)
		}
	}).keepLatest(),

	updateCoordinates: task(function * (coordinates) {
		const channel = get(this, 'model')
		channel.setProperties({
			coordinatesLatitude: coordinates.lat,
			coordinatesLongitude: coordinates.lng
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
					debug('Image saved.')
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
			Ember.debug('clearing unsaved changes and going back to channel.index')
			get(this, 'model').rollbackAttributes()
			this.transitionToRoute('channel', get(this, 'model'))
		}
	}
})
