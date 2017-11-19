import EmberObject from '@ember/object';
import KeyboardShortcutsGlobalMixin from 'radio4000/mixins/keyboard-shortcuts-global';
import { module, test } from 'qunit';

module('Unit | Mixin | keyboard shortcuts global');

// Replace this with your real tests.
test('it works', function(assert) {
  let KeyboardShortcutsGlobalObject = EmberObject.extend(KeyboardShortcutsGlobalMixin);
  let subject = KeyboardShortcutsGlobalObject.create();
  assert.ok(subject);
});
