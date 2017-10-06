import Service from '@ember/service';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('user-login', 'Integration | Component | user login', {
	integration: true
});

test('it renders', function (assert) {
	this.register('service:session', Service.extend());
	// no real tests yet
	this.render(hbs`{{user-login}}`);
	assert.equal(1, 1);
});
