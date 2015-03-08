import clean from 'radio4000/utils/clean';

module('clean');

test('it works', function() {
	var string = '&$#! S??omething// With UPPERCASE and SPACES and CH#$@#%(*!';
	var result = clean(string);

	ok(result.indexOf(' ') < 1, 'String can not contain spaces.');
	ok(result.indexOf('/') < 1, 'String can not contain a slash.');
	ok(result.indexOf('?') < 1, 'String can not contain a question mark.');
});
