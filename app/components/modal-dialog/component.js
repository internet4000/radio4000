import {on} from '@ember/object/evented'
import ModalDialog from 'ember-modal-dialog/components/modal-dialog'
import {EKMixin as EmberKeyboardMixin, keyDown} from 'ember-keyboard'

export default ModalDialog.extend(EmberKeyboardMixin, {
	translucentOverlay: true,

	init() {
		this._super(...arguments)
		this.set('keyboardActivated', true)
		// This ensures the modal has first priority to respond to keybard events.
		// Useful when the modal contains {{inputs}} that otherwise swallow the event.
		this.set('keyboardFirstResponder', true)
	},

	closeOnEsc: on(keyDown('Escape'), function() {
		const onClose = this.get('onClose')
		if (onClose) {
			onClose()
		}
	})
})
