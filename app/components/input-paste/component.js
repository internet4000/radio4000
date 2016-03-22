import Ember from 'ember';

const {TextField, on, run, debug} = Ember;

export default TextField.extend({
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
