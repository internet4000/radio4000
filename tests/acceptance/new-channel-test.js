import {test} from 'qunit';
import moduleForAcceptance from 'radio4000/tests/helpers/module-for-acceptance';
import {stubValidSession} from 'radio4000/tests/helpers/torii';

moduleForAcceptance('Acceptance | new channel');

test('visiting /new without a session redirects', function (assert) {
	visit('/new');
	andThen(function () {
		assert.equal(currentURL(), '/login');
	});
});

test('visiting /new with a valid session', function (assert) {
	assert.expect(3);

	stubValidSession(this.application, {
		id: 'oskar'
	});

	visit('/new');
	andThen(function () {
		assert.equal(currentURL(), '/new');

		const btn = find('.Form .Btn--primary');
		assert.equal(btn.attr('disabled'), 'disabled', 'it requires a title to submit');

		fillIn('.Form input', 'My new radio');

		andThen(() => {
			assert.equal(btn.attr('disabled'), undefined, 'it can submit with a title');
		});
	});
});

