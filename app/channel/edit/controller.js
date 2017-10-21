import Ember from 'ember'
import { task } from 'ember-concurrency'
import clean from 'radio4000/utils/clean'
import reservedUrls from 'radio4000/utils/reserved-urls'

const { Controller, computed, debug, get, set } = Ember

export default Controller.extend({
	// Used to cache the initial slug. Comes from the route's setupController.
	initialSlug: undefined,

	// Used to cache the lat/lng before saving.
	newLat: null,
	newLng: null,

	// sameLatitude: equal('lat', 'model.coordinatesLatitude'),
	// sameLongitude: equal('lng', 'model.coordinatesLongitude'),
	// hasNewCoordinates: and('sameLatitude', 'sameLongitude'),
	hasNewCoordinates: computed('newLat', 'newLng', 'model.{coordinatesLatitude,coordinatesLongitude}', function() {
		const lat = get(this, 'model.coordinatesLatitude')
		const lng = get(this, 'model.coordinatesLongitude')
		const newLat = get(this, 'newLat')
		const newLng = get(this, 'newLng')
		console.log({lat, lng, newLat, newLng})
		return !(lat === newLat && lng === newLng)
	}),

	validateSlug: task(function * (slug) {
		// Is it reserved?
		const slugIsReserved = reservedUrls.any(reservedSlug => reservedSlug === slug)
		if (slugIsReserved) {
			throw new Error(`The slug "${slug}" is reserved`)
		}
		// Is is taken by another channel?
		const query = yield this.store.query('channel', {orderBy: 'slug', equalTo: slug})
		if (query.get('firstObject')) {
			throw new Error(`The slug "${slug}" is already taken`)
		}
	}),

	saveChannel: task(function * () {
		const messages = get(this, 'flashMessages')
		const channel = get(this, 'model')

		// If nothing changed there's no need to save.
		if (!channel.get('hasDirtyAttributes')) {
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

			// We have to transition if the slug changed. Otherwise reloading is a 404.
			if (slugChanged) {
				set(this, 'initialSlug', channel.get('slug'))
				debug('refreshing because slug changed')
				this.transitionToRoute('channel.edit', channel.get('slug'))
				messages.success('Saved channel')
			}
		} catch (err) {
			messages.warning(`Sorry, we couldn't save your radio.`)
			throw new Error(err)
		}
	}).keepLatest(),

	saveCoordinates: task(function * () {
		const channel = get(this, 'model')
		channel.setProperties({
			coordinatesLatitude: get(this, 'newLat'),
			coordinatesLongitude: get(this, 'newLng')
		})
		yield channel.save()
	}).drop(),

	actions: {
		resetCoordinates() {
			// how to reset?
		},
		updateCoordinates(position) {
			this.setProperties({
				newLat: position.lat,
				newLng: position.lng
			})
		},
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
