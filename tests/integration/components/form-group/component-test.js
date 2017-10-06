import EmberObject from '@ember/object';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('form-group', 'Integration | Component | form group', {
	integration: true
});

test('it renders', function (assert) {
	assert.expect(3);

	this.set('label', 'Full name');
	this.set('hint', 'You need a hint, really?');
	this.render(hbs`{{form-group label=label hint=hint}}`);

	let $label = this.$('label');

	assert.equal($label.text().trim(), this.get('label'), 'it renders a label');
	assert.equal($label.attr('title'), this.get('hint'), 'it renders a hint');

	// Template block usage:
	this.set('item', EmberObject.create({title: 'My item'}));

	this.render(hbs`
		{{#form-group model=item valuePath="title" as |value|}}
			<input value={{value}}>
		{{/form-group}}
	`);
	assert.equal(this.$('input').val(), 'My item', 'it yields the value');
});
