import Ember from 'ember'
import {task} from 'ember-concurrency'
import reservedUrls from 'radio4000/utils/reserved-urls'
import randomText from 'radio4000/utils/random-text'
import clean from 'radio4000/utils/clean'

export default Ember.Mixin.create({
	// Prepends a random string to a string
	suffixSlug(slug) {
		return `${slug}-${randomText()}`
	},

	validateSlug: task(function * (slug) {
		// Make sure we are testing the 'cleaned' version.
		slug = clean(slug)

		// Check if it reserved.
		const slugIsReserved = reservedUrls.any(
			reservedSlug => reservedSlug === slug
		)

		// Check if it is taken by another channel.
		const query = yield this.store.query('channel', {
			orderBy: 'slug',
			equalTo: slug
		})
		const slugIsTaken = Boolean(query.get('firstObject'))

		if (slugIsReserved || slugIsTaken) {
			throw new Error(`The slug "${slug}" is already taken`)
		}

		return true
	})
})
