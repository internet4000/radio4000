import Ember from 'ember';
// import FocusInputComponent from '../focus-input/component';

export default Ember.TextField.extend({
	capturePaste: Ember.on('didInsertElement', function () {
		let self = this;
		let input = this.element;
		let $input = this.$();

		// use jQuery's 'paste' event
		$input.on('paste', function () {
			// without run loop, the pasted value isn't available yet
			Ember.run.schedule('afterRender', function () {
				// don't submit if field is invalid
				if (input.validity.typeMismatch) {
					Ember.debug('input not valid');
					return;
				}

				// actions up!
				self.sendAction('pasted', $input.val());
			});
		});
	})
});
