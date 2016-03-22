import {moduleForComponent, test} from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('add-track', 'Integration | Component | add track', {
  integration: true
});

test('it renders', function (assert) {
  assert.expect(2);

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{add-track}}`);

  assert.equal(this.$().text().trim(), 'Register or log in');

  // Template block usage:
  this.render(hbs`
    {{#add-track}}
      template block text
    {{/add-track}}
  `);

  assert.equal(this.$().text().trim(), 'Register or log in');
});
