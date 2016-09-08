import {isEnvironment} from 'radio4000/helpers/is-environment';
import {module, test} from 'qunit';
import config from 'radio4000/config/environment';

module('Unit | Helper | is environment');

test('it recognizes the current environment and returns a boolean', function (assert) {
	const result = isEnvironment(config.environment);
	assert.ok(result);
});
