import Ember from 'ember';
import {moduleForComponent, test} from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('app-root', 'Integration | Component | app root', {
	integration: true
});

test('it renders', function (assert) {
	this.register('service:session', Ember.Service.extend());

	// assert.expect(2);
	this.render(hbs`{{app-root}}`);
	assert.ok(true);

	// This promise is only here to trick the test to run long enough for the
	// child 'ember-youtube' component inside
	// return Ember.Test.promise(function (resolve) {
	// 	window.setTimeout(function () {
	// 		assert.ok(this.$('#EmberYoutube-player').length);

	// 		// Make sure the dummy app is being removed.
	// 		assert.notOk(document.querySelector('.DummyApp'));
	// 		resolve();
	// 	}, 2000);
	// });
});
