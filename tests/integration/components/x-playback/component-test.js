import Service from '@ember/service';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('x-playback', 'Integration | Component | x playback', {
	integration: true
});

test('it renders', function (assert) {
	this.register('service:session', Service.extend());
	this.render(hbs`{{x-playback}}`);
	assert.equal(this.$('radio4000-player').length, 1);
});
