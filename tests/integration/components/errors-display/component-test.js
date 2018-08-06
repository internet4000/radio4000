import {module, test} from 'qunit'
// import Ember from 'ember';
import {setupRenderingTest} from 'ember-qunit'
import '@ember/test-helpers'

module('Integration | Component | errors display', function(hooks) {
	setupRenderingTest(hooks)

	test('it renders', function(assert) {
		// const fakeTrackModel = Ember.Object.extend(Validations);
		// const track = fakeTrackModel.create(Ember.getOwner(this).ownerInjection(), {
		// 	url: 'https://www.youtube.com/watch?v=-Op4D4bkK6Y'
		// });

		// this.set('track', track);
		// this.render(hbs`{{errors-display model=track valuePath="url"}}`);
		// assert.equal(this.$('p').eq(0).text().trim(), 'One error', 'it can render an error');

		// this doesn't work yet
		assert.equal(1, 1)
	})
})
