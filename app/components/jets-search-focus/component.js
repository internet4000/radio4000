import Ember from 'ember'
import Component from '@ember/component';
import { EKMixin, keyUp } from 'ember-keyboard'

export default Component.extend(EKMixin, {
	keyboardActivated: true,

	focusSearch: Ember.on(keyUp('shift+KeyS'), function() {
		this.element.querySelector('input[type="search"]').focus()
	})
});
