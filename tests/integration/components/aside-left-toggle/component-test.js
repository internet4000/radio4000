import {moduleForComponent, test} from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('aside-left-toggle', 'Integration | Component | aside left toggle', {
	integration: true
});

test('it renders', function (assert) {
	this.render(hbs`{{aside-left-toggle}}`);
	assert.ok(this.$('span').length === 3);
});
