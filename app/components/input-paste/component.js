import Ember from 'ember';

const {TextField, on, run, debug} = Ember;

export default TextField.extend({
	capturePaste: on('didInsertElement', function () {
		let self = this;
		let input = this.element;
		let $input = this.$();

		// use jQuery's 'paste' event
		$input.on('paste', function () {
			// without run loop, the pasted value isn't available yet
			run.schedule('afterRender', function () {
				// don't submit if field is invalid
				if (input.validity.typeMismatch) {
					debug('input not valid');
					return;
				}

				// actions up!
				self.sendAction('onPaste', $input.val());
			});
		});
	})
});
