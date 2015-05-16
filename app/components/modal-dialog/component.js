import Ember from 'ember';
import ModalDialog from 'ember-modal-dialog/components/modal-dialog';

// Extends ember-modal-dialog with keyboard-shortcuts
// (through ember-key-responder)

export default ModalDialog.extend({
	translucentOverlay: true,
	overlayClassNames: ['ember-modal-overlay'], // set this in a subclass definition
	acceptsKeyResponder: true,
	becomeKeyResponderWhenInserted: Ember.on('didInsertElement', function() {
		this.becomeKeyResponder();
	}),

	resignKeyResponderWhenDestroyed: Ember.on('willDestroyElement', function() {
		this.resignKeyResponder();
	}),

	cancel: function() {
		this.sendAction('close');
	}
});
