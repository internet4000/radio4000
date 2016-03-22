import randomText from '../../../utils/random-text';
import {module, test} from 'qunit';

module('randomText');

// Replace this with your real tests.
test('Generate a random string of 4 characters for the newChannel.url', function (assert) {
	let timesToTest = 10;
	let timesToSuccess = 8;
	let i = 0;

	let testedResults = [];

	while (i < timesToTest) {
		i++;
		let result = randomText();

		// if the string is in the array, we have a duplicate
		// so don't push it to the array, to see how many duplicated
		if (testedResults.indexOf(result) === -1) {
			testedResults.push('result');
		}

		assert.equal(typeof result, 'string', 'It is a string');
		assert.equal(result.length, 4, 'It is a string of 4 characters');
	}

	assert.ok(testedResults.length > timesToSuccess, 'At least 8 of the random strings were different');
});
test('it is a string', function (assert) {
	const result = randomText();
	assert.ok(typeof result === 'string', 'It is a string yay!');
});
