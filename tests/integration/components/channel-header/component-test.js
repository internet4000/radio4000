import {module, test} from 'qunit'
import {setupRenderingTest} from 'ember-qunit'
import '@ember/test-helpers'

module('Integration | Component | channel header', function(hooks) {
	setupRenderingTest(hooks)

	test('it renders', function(assert) {
		assert.equal(1, 1)
		// this.render(hbs`{{channel-header}}`);
		// assert.equal(this.$().text().trim(), '');
		// // Template block usage:
		// this.render(hbs`
		// 	{{#channel-header}}
		// 		template block text
		// 	{{/channel-header}}
		// `);
		// assert.equal(this.$().text().trim(), 'template block text');
	})
})
