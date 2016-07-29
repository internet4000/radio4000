import {moduleForComponent, test} from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('app-root', 'Integration | Component | app root', {
	integration: true
});

test('it renders', function (assert) {
	// assert.expect(2);
	this.render(hbs`{{app-root}}`);
	// Make sure the dummy app is being removed.
	assert.notOk(document.querySelector('.DummyApp'));
	// assert.ok(this.$().hasClass('Root'));
});
