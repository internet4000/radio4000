import Ember from 'ember';

export default Ember.FocusInputComponent.extend({
	capturePaste: function() {
		var self = this;
		var $input = this.$('input');

		// use jQuery's 'paste' event
		$input.on('paste', function() {

			// using setTimeout hack,
			// otherwise the pasted value isn't available yet
			setTimeout(function() {

				// pass the action up!
				self.sendAction('pasted', $input.val());
			}, 100);
		});
	}.on('didInsertElement')
});
