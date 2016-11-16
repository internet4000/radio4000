import {test} from 'qunit';
import moduleForAcceptance from 'radio4000/tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | pages');

// Test that we can actually visit our different pages.

test('visiting /about', function (assert) {
	assert.expect(4);

	visit('/about');
	andThen(() => {
		assert.equal(currentURL(), '/about');
	});

	// visit('/intro');
	// andThen(() => {
	// 	assert.equal(currentURL(), '/intro');
	// });

	visit('/help');
	andThen(() => {
		assert.equal(currentURL(), '/help');
	});

	visit('/feedback');
	andThen(() => {
		assert.equal(currentURL(), '/feedback');
		assert.equal(find('.SiteMain iframe').length, 1, 'We have the google iframe embed');
	});
});

