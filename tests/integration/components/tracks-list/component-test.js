import {moduleForComponent, test} from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('tracks-list', 'Integration | Component | tracks list', {
	integration: true
});

test('it renders with items and sorting works', function (assert) {
	assert.expect(1);

	this.set('items', [{title: 'Michael', created: 1}, {title: 'Jackson', created: 2}]);

	this.render(hbs`
		{{#tracks-list items=items as |item|}}
			<h2>{{item.title}}</h2>
		{{/tracks-list}}
	`);

	assert.equal(this.$().find('h2:first').text().trim(), 'Jackson', 'it renders newest item on top');
});
