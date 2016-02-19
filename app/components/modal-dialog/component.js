import Ember from 'ember';
import ModalDialog from 'ember-modal-dialog/components/modal-dialog';
// import {EKOnInsertMixin, keyUp} from 'ember-keyboard';

const {$, on} = Ember;

export default ModalDialog.extend({
	translucentOverlay: true,
	overlayClassNames: ['ember-modal-overlay'],

	setup: on('didInsertElement', function () {
		$('body').on('keyup.modal-dialog', e => {
			if (e.keyCode === 27) {
				this.sendAction('close');
			}
		});
	}),

	teardown: on('willDestroyElement', function () {
		$('body').off('keyup.modal-dialog');
	})

	// activateKeyboard: on('init', function () {
	// 	console.log('HELLO');
	// 	this.set('keyboardActivated', true);
	// }),

	// closeModalsOnKeypress: on(keyUp('a'), function () {
	// 	console.log('yea');
	// 	this.sendAction('close');
	// })
});
