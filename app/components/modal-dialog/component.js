import Ember from 'ember';
import ModalDialog from 'ember-modal-dialog/components/modal-dialog';

// Extends ember-modal-dialog with keyboard-shortcuts

export default ModalDialog.extend({
	translucentOverlay: true,
	overlayClassNames: ['ember-modal-overlay'],
	cancel() {
		this.sendAction('close');
	}
});
