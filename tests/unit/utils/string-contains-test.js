import stringContains from 'radio4000/utils/string-contains';
import {module, test} from 'qunit';

module('Unit | Utility | string contains');

test('it works', function (assert) {
	let result = stringContains('This is the internet. Let me be your guide.', 'guide');
	assert.ok(result);
});
