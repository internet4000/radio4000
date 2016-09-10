import {moduleForComponent, test} from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('x-playback', 'Integration | Component | x playback', {
	integration: true
});

test('it renders', function (assert) {
	this.render(hbs`{{x-playback}}`);
	assert.equal(this.$('.Playback-toggleVolume').text().trim(), 'Mute');
});
