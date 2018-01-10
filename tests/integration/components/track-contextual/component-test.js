import Ember from 'ember'
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('track-contextual', 'Integration | Component | track contextual', {
  integration: true
});

test('it renders', function(assert) {
	this.register('service:session', Ember.Service.extend())
  this.render(hbs`{{track-contextual}}`);
  assert.ok(this.$().find('button').length > 0)
  assert.ok(this.$().find('select').length > 0)
});
