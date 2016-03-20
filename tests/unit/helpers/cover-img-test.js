import {coverImg} from 'radio4000/helpers/cover-img';
import {module, test} from 'qunit';

module('Unit | Helper | cover img');

test('it works', function (assert) {
	// {{cover-img src size=250}}
	let result = coverImg(['somestringid'], {size: 250});
	assert.equal(typeof result, 'string');
});
