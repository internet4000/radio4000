import {module, test} from 'qunit'
// Copy/pasted from
// https://github.com/rmmmp/emberfire-utils/blob/master/tests/unit/transforms/timestamp-test.js

import {setupTest} from 'ember-qunit'

const TIMESTAMP = {'.sv': 'timestamp'}

module('Unit | Transform | timestamp', function(hooks) {
	setupTest(hooks)

	test('should serialize to Firebase server value timestamp', function(assert) {
		assert.expect(1)

		const transform = this.owner.lookup('transform:timestamp')
		const result = transform.serialize()

		assert.deepEqual(result, TIMESTAMP)
		// assert.deepEqual(result, firebase.database.ServerValue.TIMESTAMP)
	})

	test('should deserialize to number', function(assert) {
		assert.expect(1)

		// Arrange
		const transform = this.owner.lookup('transform:timestamp')

		// Act
		const result = transform.deserialize(1483228800000)

		// Assert
		// assert.deepEqual(result, new Date('2017-01-01'));
		assert.deepEqual(result, 1483228800000)
	})
})
