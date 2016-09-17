import Ember from 'ember';
import MinimalRouteMixin from 'radio4000/mixins/minimal-route';
import {module, test} from 'qunit';

module('Unit | Mixin | minimal route');

// Replace this with your real tests.
test('it works', function (assert) {
	let MinimalRouteObject = Ember.Object.extend(MinimalRouteMixin);
	let subject = MinimalRouteObject.create();
	assert.ok(subject);
});
