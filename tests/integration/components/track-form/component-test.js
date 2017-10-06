import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('track-form', 'Integration | Component | track form', {
	integration: true
});

test('it renders', function (assert) {
	assert.expect(2);

	// Set any properties with this.set('myProperty', 'value');
	// Handle any actions with this.on('myAction', function(val) { ... });

	this.render(hbs`{{track-form}}`);

	assert.equal(this.$().text().trim(), '');

	// Template block usage:
	this.render(hbs`
		{{#track-form}}
			template block text
		{{/track-form}}
	`);

	assert.equal(this.$().text().trim(), 'template block text');
});
