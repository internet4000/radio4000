import {moduleForComponent, test} from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('track-form-add', 'Integration | Component | track form add', {
	integration: true
});

test('it renders', function (assert) {
	this.render(hbs`{{track-form-add}}`);
	assert.ok(this.$('.Form-group').length);
	assert.ok(this.$('button[type="submit"]').length);
});

