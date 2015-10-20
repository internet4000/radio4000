import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('playback/play-shuffle-btn', 'Integration | Component | playback/play shuffle btn', {
  integration: true
});

test('it renders', function(assert) {
  assert.expect(2);

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{playback/play-shuffle-btn}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#playback/play-shuffle-btn}}
      template block text
    {{/playback/play-shuffle-btn}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
