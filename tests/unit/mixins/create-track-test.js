import EmberObject from '@ember/object';
import CreateTrackMixin from '../../../mixins/create-track';
import { module, test } from 'qunit';

module('Unit | Mixin | create track');

// Replace this with your real tests.
test('it works', function (assert) {
	const CreateTrackObject = EmberObject.extend(CreateTrackMixin);
	const subject = CreateTrackObject.create();
	assert.ok(subject);
});
