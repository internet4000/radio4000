import {formatDate} from 'radio4000/helpers/format-date';
import {module, test} from 'qunit';

module('Unit | Helper | format date');

// Replace this with your real tests.
test('it works', function (assert) {
	let result = formatDate(1414571557200);
	console.log(result);
	assert.ok(result);
});
