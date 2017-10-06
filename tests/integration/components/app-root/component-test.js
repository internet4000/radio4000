import Service from '@ember/service';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('app-root', 'Integration | Component | app root', {
	integration: true
});

test('it renders', function (assert) {
	this.register('service:session', Service.extend());

	// assert.expect(2);
	this.render(hbs`{{app-root}}`);
	assert.ok(true);
});
