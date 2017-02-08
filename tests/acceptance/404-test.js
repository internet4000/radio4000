import {test} from 'qunit';
import moduleForAcceptance from 'radio4000/tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | 404');

test('visiting /404 works', function (assert) {
	visit('/404');

	andThen(function () {
		assert.equal(currentURL(), '/404');
	});
});

test('visiting a non-existing route redirects to /404', function (assert) {
	visit('/gghf894h');

	andThen(function () {
		assert.equal(currentURL(), '/404');
	});
});

