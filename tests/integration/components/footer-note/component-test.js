import {moduleForComponent, test} from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('footer-note', 'Integration | Component | footer note', {
	integration: true
});

test('it renders', function (assert) {
	// Set any properties with this.set('myProperty', 'value');
	// Handle any actions with this.on('myAction', function(val) { ... });"

	this.render(hbs`{{footer-note}}`);
	assert.equal(this.$().text().trim(), 'Internet4000');
});
