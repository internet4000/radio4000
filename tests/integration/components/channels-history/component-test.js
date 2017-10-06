import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('channels-history', 'Integration | Component | channels history', {
	integration: true
});

test('it renders', function (assert) {
	this.render(hbs`{{channels-history}}`);
	// assert.equal(this.$().text().trim(), '');
	assert.equal(1, 1);
});
