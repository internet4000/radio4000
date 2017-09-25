import Ember from 'ember';
import ModalDialog from 'ember-modal-dialog/components/modal-dialog';

const {on, $} = Ember;

export default ModalDialog.extend({
	// Change the default value to use overlay.
	translucentOverlay: true,

	// Close modal on ESC.
	setup: on('didInsertElement', function () {
		this._super()
		$('body').on('keyup.modal-dialog', e => {
			if (e.keyCode === 27) {
				this.sendAction('close');
			}
		});
	}),

	// Remove custom events.
	teardown: on('willDestroyElement', function () {
		$('body').off('keyup.modal-dialog');
	})
});
