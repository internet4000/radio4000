import Ember from 'ember';
import {moduleForComponent, test} from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('app-root', 'Integration | Component | app root', {
	integration: true
});

test('it renders', function (assert) {
	this.register('service:session', Ember.Service.extend());

	// assert.expect(2);
	this.render(hbs`{{app-root}}`);
	assert.ok(true);
});
