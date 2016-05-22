import {moduleForComponent, test} from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('/channel-card', 'Integration | Component | channel card', {
  integration: true
});

test('it renders', function (assert) {
  assert.expect(1);

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.set('model', {title: 'It works!'});
  this.render(hbs`{{channel-card channel=model}}`);
  assert.equal(this.$('h3').text().trim(), 'It works!');
});
