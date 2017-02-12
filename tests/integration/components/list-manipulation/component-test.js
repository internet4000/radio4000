import {moduleForComponent, test} from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('list-manipulation', 'Integration | Component | list manipulation', {
	integration: true
});

test('it renders', function (assert) {
	let list = [
		{id: 1, name: 'Manchester'},
		{id: 2, name: 'United'},
		{id: 3, name: 'Forever'}
	];
	this.set('list', list);

	// {{btn-list-manipulation text='Recently updated'
	// 		onClick=(action updateSorting 'updated')}}

	this.render(hbs`
		{{#list-manipulation
			list=list
			as |sortedList|}}
			<ul class="test">
				{{#each sortedList as |item|}}
					<li>{{item.name}}</li>
				{{/each}}
			</ul>
		{{/list-manipulation}}
	`);

	// Shortcut to get the name of each item in the list by index.
	const getName = index => this.$('.test li').eq(index).text().trim();

	// this.set('key', 'id');
	// this.set('direction', 'desc');
	assert.equal(getName(0), list[0].name, 'sorting by key works');
	// assert.equal(getName(1), list[1].name);
	// assert.equal(getName(2), list[2].name);

	// this.set('direction', 'asc');
	// assert.equal(getName(0), list[2].name, 'sort direction can be changed');
	// assert.equal(getName(1), list[1].name);
	// assert.equal(getName(2), list[0].name);

	// this.set('key', 'name');
	// this.set('direction', 'asc');
	// assert.equal(getName(0), 'Forever', 'sort key can be changed');
});
