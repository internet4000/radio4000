import {moduleForComponent, test} from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('errors-display', 'Integration | Component | errors display', {
	integration: true
});

test('it renders', function (assert) {
	assert.expect(1);

	// Set any properties with this.set('myProperty', 'value');
	// Handle any actions with this.on('myAction', function(val) { ... });

	// this.render(hbs`{{errors-display}}`);
	// assert.equal(this.$().text().trim(), '', 'starts empty');

	this.set('errors', ['One error', 'Another error']);
	this.render(hbs`{{errors-display showErrors=true errors=errors}}`);
	assert.equal(this.$('.Warning').eq(0).text().trim(), 'One error', 'it can render an error');
});
