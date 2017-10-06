import Service from '@ember/service';
import { moduleFor, test } from 'ember-qunit'

moduleFor(
	'route:channel/tracks/track/index',
	'Unit | Route | channel/tracks/track/index',
	{
		// Specify the other units that are required for this test.
		// needs: ['controller:foo']
	}
)

test('it exists', function(assert) {
	this.register('service:player', Service.extend())
	let route = this.subject()
	assert.ok(route)
})
