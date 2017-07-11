import {moduleForComponent, test} from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('feedback-form-google-spreadsheet', 'Integration | Component | feedback form google spreadsheet', {
	integration: true
});

test('it renders', function (assert) {
  this.render(hbs`{{feedback-form-google-spreadsheet}}`);
  assert.equal(this.$().text().trim(), '');
});
