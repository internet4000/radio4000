import { moduleForComponent, test } from 'ember-qunit'
import hbs from 'htmlbars-inline-precompile'
import Ember from 'ember'

moduleForComponent(
	'play-random-channel',
	'Integration | Component | play random channel',
	{
		integration: true
	}
)

test('it renders', function(assert) {
	this.register('service:session', Ember.Service.extend())
	this.render(hbs`{{play-random-channel}}`)
	assert.equal(1, 1)
})
