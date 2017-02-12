import {moduleForComponent, test} from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('btn-list-manipulation', 'Integration | Component | btn list manipulation', {
	integration: true
});

test('it renders', function (assert) {
	// Set any properties with this.set('myProperty', 'value');
	// Handle any actions with this.on('myAction', function(val) { ... });

	this.render(hbs`{{btn-list-manipulation}}`);

	assert.equal(this.$().text().trim(), '');

	// Template block usage:
	this.render(hbs`
		{{btn-list-manipulation text='template text'}}
	`);
	assert.equal(this.$().text().trim(), 'template text');
});
