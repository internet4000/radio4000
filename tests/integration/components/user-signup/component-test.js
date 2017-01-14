import {moduleForComponent, test} from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('user-signup', 'Integration | Component | user signup', {
	integration: true
});

test('it renders', function (assert) {
	// no real tests yet
	this.render(hbs`{{user-login}}`);
	assert.equal(1, 1);
});
