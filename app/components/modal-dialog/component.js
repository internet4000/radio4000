/* eslint ember/closure-actions:0 */
import ModalDialog from 'ember-modal-dialog/components/modal-dialog';
import Ember from 'ember'

const {$} = Ember

export default ModalDialog.extend({
	// Change the default value to use overlay.
	translucentOverlay: true,

	didInsertElement() {
		this._super()

		// Close modal on ESC.
		$('body').on('keyup.modal-dialog', e => {
			if (e.keyCode === 27) {
				this.sendAction('close');
			}
		});
	},

	// Remove custom events.
	willDestroyElement() {
		this._super()
		$('body').off('keyup.modal-dialog')
	}
});
