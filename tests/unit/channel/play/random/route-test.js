import Ember from 'ember'
import { moduleFor, test } from 'ember-qunit';

moduleFor('route:channel/play/random', 'Unit | Route | channel/play/random', {
  // Specify the other units that are required for this test.
  // needs: ['controller:foo']
});

test('it exists', function(assert) {
	this.register('service:player', Ember.Service.extend());
  let route = this.subject();
  assert.ok(route);
});
