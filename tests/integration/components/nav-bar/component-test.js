import {moduleForComponent, test} from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('nav-bar', 'Integration | Component | nav bar', {
	integration: true
});

test('it renders', function (assert) {
	assert.expect(1);

	// Set any properties with this.set('myProperty', 'value');
	// Handle any actions with this.on('myAction', function(val) { ... });

	this.render(hbs`{{nav-bar}}`);
	assert.ok(this.$('a').eq(0).hasClass('Logo'));
});
