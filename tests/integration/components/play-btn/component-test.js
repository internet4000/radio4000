import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('play-btn', 'Integration | Component | play btn', {
	integration: true
});

test('it renders', function (assert) {
	this.render(hbs`{{play-btn}}`);
	assert.equal(this.$().text().trim(), '▶');
});
