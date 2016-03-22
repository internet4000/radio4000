import Ember from 'ember';
import ModalDialog from 'ember-modal-dialog/components/modal-dialog';
// import {EKOnFocusMixin, keyUp} from 'ember-keyboard';

const {on, $} = Ember;

export default ModalDialog.extend({
	translucentOverlay: true,
	overlayClassNames: ['ember-modal-overlay'],

	// activateKeyboard: Ember.on('init', function () {
	// 	this.set('keyboardActivated', true);
	// }),
	// onEscape: on(keyUp('Escape'), function () {
	// 	this.sendAction('close');
	// })

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
});
