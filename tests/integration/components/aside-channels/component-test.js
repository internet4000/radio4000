import {moduleForComponent, test} from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('aside-channels', 'Integration | Component | aside channels', {
	integration: true
});

test('it renders', function (assert) {
	// we have no tests....
	this.render(hbs`{{aside-channels}}`);
	assert.equal(1, 1);
});
