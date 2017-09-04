import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('cloudinary-upload', 'Integration | Component | cloudinary upload', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{cloudinary-upload}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#cloudinary-upload}}
      template block text
    {{/cloudinary-upload}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
