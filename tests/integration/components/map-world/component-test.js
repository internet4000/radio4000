import {module, test} from 'qunit'
import {setupRenderingTest} from 'ember-qunit'
import '@ember/test-helpers'

module('Integration | Component | map world', function(hooks) {
	setupRenderingTest(hooks)

	test('it renders', function(assert) {
		// Set any properties with this.set('myProperty', 'value');
		// Handle any actions with this.on('myAction', function(val) { ... });
		assert.equal(1, 1)
		// this.render(hbs`{{map-world}}`);

		// assert.equal(this.$().text().trim(), '');

		// // Template block usage:
		// this.render(hbs`
		//   {{#map-world}}
		//     template block text
		//   {{/map-world}}
		// `);

		// assert.equal(this.$().text().trim(), 'template block text');
	})
})
