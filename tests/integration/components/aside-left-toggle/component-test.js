import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('aside-left-toggle', 'Integration | Component | aside left toggle', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{aside-left-toggle}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#aside-left-toggle}}
      template block text
    {{/aside-left-toggle}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
