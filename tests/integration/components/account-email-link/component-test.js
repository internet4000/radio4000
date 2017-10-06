import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('account-email-link', 'Integration | Component | account email link', {
	integration: true
});

test('it renders', function (assert) {
	this.render(hbs`{{account-email-link}}`);
	assert.equal(this.$().text().trim(), 'Add');
});
