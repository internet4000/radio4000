import {moduleForComponent, test} from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('play-pause-btn', 'Integration | Component | play pause btn', {
	integration: true
});

test('it renders', function (assert) {
	// Set any properties with this.set('myProperty', 'value');
	// Handle any actions with this.on('myAction', function(val) { ... });

	this.render(hbs`{{play-pause-btn}}`);

	assert.equal(this.$().text().trim(), '');

	// Template block usage:
	this.render(hbs`
		{{#play-pause-btn}}
			template block text
		{{/play-pause-btn}}
	`);

	assert.equal(this.$().text().trim(), 'template block text');
});
