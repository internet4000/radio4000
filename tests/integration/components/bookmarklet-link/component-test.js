import {moduleForComponent, test} from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('bookmarklet-link', 'Integration | Component | bookmarklet link', {
	integration: true
});

test('it renders', function (assert) {
	// assert.expect(1);
	this.render(hbs`{{bookmarklet-link}}`);
	assert.ok(this.$().find('a').length);
});
