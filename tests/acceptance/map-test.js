import {test} from 'qunit'
import moduleForAcceptance from 'radio4000/tests/helpers/module-for-acceptance'

moduleForAcceptance('Acceptance | map')

test('visiting /map', async function(assert) {
	await visit('/map')

	assert.ok(currentURL().includes('/map'))

	const markers = document.querySelectorAll('.leaflet-marker-icon')
	assert.ok(markers.length, 'map markers are being rendered')
})
