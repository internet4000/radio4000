import Ember from 'ember';

export default Ember.Component.extend({

	becomeFocused: function() {
		this.$('input').focus();
	}.on('didInsertElement'),

	capturePaste: function() {
		var self = this;
		var input = this.$('input');

		input.on('paste', function() {

			// using setTimeout hack,
			// otherwise the pasted value isn't available yet
			setTimeout(function() {

				// send the action to whereever the component is placed
				self.sendAction('pasted', input.val());
			}, 100);
		});
	}.on('didInsertElement')
});
