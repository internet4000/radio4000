import randomText from '../../../utils/random-text';
import { module, test } from 'qunit';

module('randomText');

// Replace this with your real tests.
test('it works', function(assert) {
  var result = randomText();
  assert.ok(typeof result === 'string', 'It is a string yay!');
});
