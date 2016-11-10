import {test} from 'qunit';
import moduleForAcceptance from 'radio4000/tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | pages');

// Test that we can actually visit our different pages.

test('visiting /about', function (assert) {
	visit('/about');
	andThen(() => {
		assert.equal(currentURL(), '/about');
	});
});

test('visiting /intro', function (assert) {
	visit('/intro');
	andThen(() => {
		assert.equal(currentURL(), '/intro');
	});
});

test('visiting /help', function (assert) {
	visit('/help');
	andThen(() => {
		assert.equal(currentURL(), '/help');
	});
});

test('visiting /feedback', function (assert) {
	assert.expect(2);
	visit('/feedback');
	andThen(() => {
		assert.equal(currentURL(), '/feedback');
		assert.equal(find('.SiteMain iframe').length, 1, 'We have the google iframe embed');
	});
});
