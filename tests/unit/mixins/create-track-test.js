import Ember from 'ember'
import CreateTrackMixin from '../../../mixins/create-track'
import {module, test} from 'qunit'

module('Unit | Mixin | create track', function() {
	// Replace this with your real tests.
	test('it works', function(assert) {
		const CreateTrackObject = Ember.Object.extend(CreateTrackMixin)
		const subject = CreateTrackObject.create()
		assert.ok(subject)
	})
})
