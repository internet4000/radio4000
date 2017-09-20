// Copy/pasted from
// https://github.com/rmmmp/emberfire-utils/blob/master/tests/unit/transforms/timestamp-test.js

import { moduleFor, test } from 'ember-qunit';
import firebase from 'firebase';

moduleFor('transform:timestamp', 'Unit | Transform | timestamp');

test('should serialize to Firebase server value timestamp', function(assert) {
  assert.expect(1);

  // Arrange
  const transform = this.subject();

  // Act
  const result = transform.serialize();

  // Assert
  assert.deepEqual(result, firebase.database.ServerValue.TIMESTAMP);
});

test('should deserialize to date', function(assert) {
  assert.expect(1);

  // Arrange
  const transform = this.subject();

  // Act
  const result = transform.deserialize(1483228800000);

  // Assert
  assert.deepEqual(result, new Date('2017-01-01'));
});
