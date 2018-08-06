import Ember from 'ember'
import {module, test} from 'qunit'
import {setupRenderingTest} from 'ember-qunit'
import {render} from '@ember/test-helpers'
import hbs from 'htmlbars-inline-precompile'

module('Integration | Component | form group', function(hooks) {
	setupRenderingTest(hooks)

	test('it renders', async function(assert) {
		assert.expect(3)

		this.set('label', 'Full name')
		this.set('hint', 'You need a hint, really?')
		await render(hbs`{{form-group label=label hint=hint}}`)

		let $label = this.$('label')

		assert.equal($label.text().trim(), this.get('label'), 'it renders a label')
		assert.equal($label.attr('title'), this.get('hint'), 'it renders a hint')

		// Template block usage:
		this.set('item', Ember.Object.create({title: 'My item'}))

		await render(hbs`
          {{#form-group model=item valuePath="title" as |value|}}
              <input value={{value}}>
          {{/form-group}}
      `)
		assert.equal(this.$('input').val(), 'My item', 'it yields the value')
	})
})
