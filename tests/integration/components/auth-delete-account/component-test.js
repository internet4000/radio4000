import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('auth-delete-account', 'Integration | Component | auth delete account', {
	integration: true
});

test('it renders', function (assert) {
	// Set any properties with this.set('myProperty', 'value');
	// Handle any actions with this.on('myAction', function(val) { ... });
	this.render(hbs`{{auth-delete-account}}`);
	assert.equal(1, 1);
});
