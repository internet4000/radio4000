import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('channel-sharer-url', 'Integration | Component | channel sharer url', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{channel-sharer-url}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#channel-sharer-url}}
      template block text
    {{/channel-sharer-url}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
