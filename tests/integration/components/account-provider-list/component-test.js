import {moduleForComponent, test} from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('account-provider-list', 'Integration | Component | account provider list', {
	integration: true
});

test('it renders', function (assert) {
	this.render(hbs`{{account-provider-list}}`);
	assert.equal(this.$().text().trim(), '');
});
