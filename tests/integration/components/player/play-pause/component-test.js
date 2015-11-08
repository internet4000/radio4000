import {moduleForComponent, test} from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('player/play-pause', 'Integration | Component | player/play pause', {
	integration: true
});

test('it renders', function (assert) {
	assert.expect(2);

	// Set any properties with this.set('myProperty', 'value');
	// Handle any actions with this.on('myAction', function(val) { ... });

	this.render(hbs`{{player/play-pause}}`);
	// this.render(hbs`{{player/play-pause isPlaying=player.isPlaying play=(action "play") pause=(action "pause")}}`);
	assert.equal(this.$('[type="checkbox"]').length, 1, 'we have a checkbox');
	assert.equal(this.$('label').length, 1, 'we have a label');
});
