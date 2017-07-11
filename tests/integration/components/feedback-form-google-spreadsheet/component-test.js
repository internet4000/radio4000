import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('feedback-form-google-spreadsheet', 'Integration | Component | feedback form google spreadsheet', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{feedback-form-google-spreadsheet}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#feedback-form-google-spreadsheet}}
      template block text
    {{/feedback-form-google-spreadsheet}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
