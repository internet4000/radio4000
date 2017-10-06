import channelConst from '../../../utils/channel-const';
import { module, test } from 'qunit';

module('Unit | Utility | channel const');

// Replace this with your real tests.
test('it works', function (assert) {
	var result = channelConst;
	assert.equal(typeof result.titleMinLength, 'number', 'The minimum titel length is a number');
});
