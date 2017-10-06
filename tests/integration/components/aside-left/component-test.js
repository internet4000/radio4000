import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('x-aside', 'Integration | Component | x aside', {
	integration: true
});

test('it renders', function (assert) {
	assert.expect(1);

	// Set any properties with this.set('myProperty', 'value');
	// Handle any actions with this.on('myAction', function(val) { ... });

	this.render(hbs`{{aside-left}}`);
	assert.ok(this.$('a').length > 0);

	// @todo make sure the click handler runs
	// this.$('a').eq(0).click();
});
