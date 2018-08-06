import Ember from 'ember'
import ValidateSlugMixin from 'radio4000/mixins/validate-slug'
import {module, test} from 'qunit'

module('Unit | Mixin | validate slug', function() {
	// Replace this with your real tests.
	test('it works', function(assert) {
		let ValidateSlugObject = Ember.Object.extend(ValidateSlugMixin)
		let subject = ValidateSlugObject.create()
		assert.ok(subject)
	})
})
