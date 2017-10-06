import { moduleFor, test } from 'ember-qunit';

moduleFor('validator:youtube-url', 'Unit | Validator | youtube-url', {
	needs: ['validator:messages']
});

test('it works', function (assert) {
	assert.expect(1);
	const validator = this.subject();
	const isvalid = validator.validate('https://www.youtube.com/watch?v=-Op4D4bkK6Y');
	assert.equal(isvalid, true);
});
