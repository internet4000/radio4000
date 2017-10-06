import { getRandomIndex, shuffleArray } from 'radio4000/utils/random-helpers';
import { module, test } from 'qunit';

module('Unit | Utility | random helpers');

test('can get a random index', function (assert) {
	const arr = [1, 2, 3, 4, 5];
	const index = getRandomIndex(arr);

	assert.strictEqual(typeof index, 'number');
	assert.ok(index >= 0);
	assert.ok(index <= arr.length);
	assert.ok(arr.includes(arr[index]));
});

test('can shuffle an array', function (assert) {
	const arr = [1, 2, 3, 4, 5];
	const shuffled = shuffleArray(arr);

	assert.ok(Array.isArray(shuffled));
	assert.notEqual(shuffled);
	shuffled.forEach(n => {
		assert.ok(arr.includes(n));
	});
});
