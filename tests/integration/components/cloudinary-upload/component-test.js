import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('cloudinary-upload', 'Integration | Component | cloudinary upload', {
  integration: true
});

test('it renders', function(assert) {
  this.render(hbs`{{cloudinary-upload}}`);
  assert.equal(this.$('input[type="file"]').length, 1);
  assert.ok(this.$('button').length > 0);
});
