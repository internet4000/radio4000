import stringContains from 'radio4000/utils/string-contains';
import { module, test } from 'qunit';

module('Unit | Utility | string contains');

test('it works', function (assert) {
	assert.expect(2);
	let test1 = stringContains('This is the internet. Let me be your guide.', 'guide');
	assert.ok(test1);
	let test2 = stringContains('Michael Jackson', 'Prince');
	assert.notOk(test2);
});
