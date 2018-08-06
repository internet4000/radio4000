import {module, test} from 'qunit'
import {visit, currentURL} from '@ember/test-helpers'
import {setupApplicationTest} from 'ember-qunit'

module('Acceptance | map', function(hooks) {
	setupApplicationTest(hooks)

	test('visiting /map', async function(assert) {
		await visit('/map')

		assert.ok(currentURL().includes('/map'))

		const markers = document.querySelectorAll('.leaflet-marker-icon')
		assert.ok(markers.length, 'map markers are being rendered')
	})
})
