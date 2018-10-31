import {module, test} from 'qunit'
import {setupRenderingTest} from 'ember-qunit'
import {render, click} from '@ember/test-helpers'
import hbs from 'htmlbars-inline-precompile'

const model = {
	title: 'Liquid - Optimo',
	body: 'Nice track',
	liveInCurrentPlayer: false,
	channel: {
		canEdit: false
	}
}

module('Integration | Component | track-item', function(hooks) {
	setupRenderingTest(hooks)

	test('it renders', async function(assert) {
		this.set('model', model)
		await render(hbs`{{track-item track=model}}`)
		assert.dom('.Track-title').hasText(this.get('model.title'))
		assert.dom('.Track-body').hasText(this.get('model.body'))
	})

	test('it plays', async function(assert) {
		assert.expect(1)
		this.set('model', model)
		this.set('mockPlayAction', track => {
			assert.deepEqual(track, model, 'submitted value is passed to external action')
		})
		await render(hbs`{{track-item track=model play=(action mockPlayAction)}}`)
		await click('.Track-link')
	})

	test('it updates class names', async function(assert) {
		this.set('model', model)
		await render(hbs`{{track-item track=model}}`)
		assert.dom('.Track').exists()
		assert.dom('.Track').doesNotHaveClass('Track--live')
		this.set('model.liveInCurrentPlayer', true)
		assert.dom('.Track').hasClass('Track--live')
	})

	test('canEdit is respected', async function(assert) {
		this.set('model', model)
		await render(hbs`{{track-item track=model}}`)
		assert.dom('option[value="editTrack"]').doesNotExist()
		this.set('model.channel.canEdit', true)
		assert.dom('option[value="editTrack"]').exists()
	})
})

