import { moduleFor, test } from 'ember-qunit';

moduleFor('controller:channel/tracks', 'Unit | Controller | channel/tracks', {
  // Specify the other units that are required for this test.
	needs: ['service:player']
});

// Replace this with your real tests.
test('it exists', function(assert) {
  let controller = this.subject();
  assert.ok(controller);
});
