import Ember from 'ember';
import FocusInput from 'radio4000/components/focus-input/component';

const {on, run, debug} = Ember;

export default FocusInput.extend({
	capturePaste: on('didInsertElement', function () {
		const self = this;
		const element = this.element;
		const $input = this.$();

		// use jQuery's 'paste' event
		this.$().on('paste', function () {
			// without run loop, the pasted value isn't available yet
			run.schedule('afterRender', function () {
				// don't submit if field is invalid
				if (element.validity.typeMismatch) {
					debug('input not valid');
					return;
				}

				// actions up!
				self.sendAction('onPaste', $input.val());
			});
		});
	})
});
