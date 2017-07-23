import {moduleForComponent, test} from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('play-shuffle-btn', 'Integration | Component | play shuffle btn', {
	integration: true
});

test('it renders', function (assert) {
	this.render(hbs`{{play-shuffle-btn}}`);
	assert.equal(this.$().text().trim(), '▶');
});
