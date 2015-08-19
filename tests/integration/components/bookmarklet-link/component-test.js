import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';


moduleForComponent('bookmarklet-link', 'Integration | Component | bookmarklet link', {
  integration: true
});

test('it renders', function(assert) {
  assert.expect(2);

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{bookmarklet-link}}`);

  assert.equal(this.$().text(), '');

  // Template block usage:
  this.render(hbs`
    {{#bookmarklet-link}}
      template block text
    {{/bookmarklet-link}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
