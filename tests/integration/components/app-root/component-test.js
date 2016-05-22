import {moduleForComponent, test} from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('app-root', 'Integration | Component | app root', {
  integration: true
});

test('it renders', function (assert) {
  assert.expect(1);

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{app-root}}`);

  //assert.equal(this.$().text().trim(), '');
  assert.notOk(document.querySelector('.DummyApp'));

  // this.set('uiStates.player.isMinimized', true);
  // assert.ok(this.$().hasClass('Root'));

  // // Template block usage:
  // this.render(hbs`
  //   {{#app-root}}
  //     template block text
  //   {{/app-root}}
  // `);
  // assert.equal(this.$().text().trim(), 'template block text');
});
