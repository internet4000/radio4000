import {getRandomIndex, shuffleArray, pickRandom} from 'radio4000/utils/random-helpers';
import {module, test} from 'qunit';

module('Unit | Utility | random helpers');

test('can get a random index', function (assert) {
	const arr = Array.from(Array(1000).keys())
	const index = getRandomIndex(arr);

	assert.strictEqual(typeof index, 'number');
	assert.ok(index >= 0);
	assert.ok(index <= arr.length);
	assert.ok(arr.includes(arr[index]));
});

test('can shuffle an array', function (assert) {
	const arr = Array.from(Array(1000).keys())
	const shuffled = shuffleArray(arr);

	assert.ok(Array.isArray(shuffled));
	assert.notEqual(shuffled);
	shuffled.forEach(n => {
		assert.ok(arr.includes(n));
	});
});

test('can shuffle and pick an array', function (assert) {
	const arr = Array.from(Array(1000).keys())
	const result = pickRandom(arr, 2)
	assert.ok(result.length === 2)
	assert.notEqual(arr, result)
});

