import ModalDialog from 'ember-modal-dialog/components/modal-dialog';

export default ModalDialog.extend({
	translucentOverlay: true,
	overlayClassNames: ['ember-modal-overlay']

	// @TODO add keyboard event to close modal on escape?
});
