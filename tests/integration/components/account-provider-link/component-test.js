import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('account-provider-link', 'Integration | Component | account provider link', {
	integration: true
});

test('it renders', function (assert) {
	this.render(hbs`{{account-provider-link}}`);
	assert.equal(this.$().text().trim(), 'Add');
});
