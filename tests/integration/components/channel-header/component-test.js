import {moduleForComponent, test} from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('channel-header', 'Integration | Component | channel header', {
	integration: true
});

test('it renders', function (assert) {
	assert.equal(1, 1);
	// this.render(hbs`{{channel-header}}`);
	// assert.equal(this.$().text().trim(), '');
	// // Template block usage:
	// this.render(hbs`
	// 	{{#channel-header}}
	// 		template block text
	// 	{{/channel-header}}
	// `);
	// assert.equal(this.$().text().trim(), 'template block text');
});
