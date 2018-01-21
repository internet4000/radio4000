import {moduleForComponent, test} from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import Service from '@ember/service'

const sessionStub = Service.extend({})

moduleForComponent('track-form-add', 'Integration | Component | track form add', {
	integration: true,
	beforeEach: function () {
		this.register('service:session', sessionStub);
		// Calling inject puts the service instance in the context of the test,
		// making it accessible as "locationService" within each test
		this.inject.service('session', { as: 'sessionService' });
	}
});

test('it renders', function (assert) {
	this.render(hbs`{{track-form-add}}`);
	assert.ok(this.$('.Form-group').length);
	assert.ok(this.$('button[type="submit"]').length);
});
