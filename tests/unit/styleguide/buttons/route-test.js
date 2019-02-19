import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | styleguide/buttons', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:styleguide/buttons');
    assert.ok(route);
  });
});
