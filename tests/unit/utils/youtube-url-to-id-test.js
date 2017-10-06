import youtubeUrlToId from 'radio4000/utils/youtube-url-to-id';
import { module, test } from 'qunit';

module('Unit | Utility | youtube url to id');

// Replace this with your real tests.
test('it works', function (assert) {
	assert.expect(2);
	let testUrl = 'https://www.youtube.com/watch?v=sCXpEMtHBhI';
	let result = youtubeUrlToId(testUrl);
	assert.ok(typeof result === 'string');
	assert.ok(testUrl.indexOf(result) >= 0);
});
