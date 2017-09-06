import {moduleForComponent, test} from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('play-random-channel', 'Integration | Component | play random channel', {
	integration: true
});

test('it renders', function (assert) {
	this.render(hbs`{{play-random-channel}}`);
	assert.equal(1, 1)
});
