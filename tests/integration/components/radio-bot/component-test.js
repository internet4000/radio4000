import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('radio-bot', 'Integration | Component | radio bot', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{radio-bot}}`);
  assert.equal(this.$().text().trim(), 'Play some music');

  // // Template block usage:
  // this.render(hbs`
  //   {{#radio-bot}}
  //     template block text
  //   {{/radio-bot}}
  // `);

  // assert.equal(this.$().text().trim(), 'template block text');
});
