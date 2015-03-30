import Ember from 'ember';
import FocusInputComponent from '../focus-input/component';

export default FocusInputComponent.extend({
	capturePaste: Ember.on('didInsertElement', function() {
		var self = this;
		var $input = this.$();

		// use jQuery's 'paste' event
		$input.on('paste', function() {

			// using setTimeout hack,
			// otherwise the pasted value isn't available yet
			setTimeout(function() {

				// pass the action up!
				self.sendAction('pasted', $input.val());
			}, 100);
		});
	})
});
