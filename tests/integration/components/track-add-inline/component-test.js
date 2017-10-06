import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('track-add-inline', 'Integration | Component | track add inline', {
	integration: true
});

test('it renders', function (assert) {
	assert.expect(1);

	// Set any properties with this.set('myProperty', 'value');
	// Handle any actions with this.on('myAction', function(val) { ... });

	this.render(hbs`{{track-add-inline}}`);

	assert.equal(this.$('input').length, 1);
});
