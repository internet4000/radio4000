import Ember from 'ember';

export default Ember.Component.extend({
	becomeFocused: function() {
		this.$('input').focus();
	}.on('didInsertElement'),

	// use jQuery's 'paste' event
	capturePaste: function() {
		var _this = this;
		var $input = this.$('input');

		$input.on('paste', function() {

			// using setTimeout hack,
			// otherwise the pasted value isn't available yet
			setTimeout(function() {

				// send the action to whereever the component is placed
				_this.sendAction('pasted', $input.val());
			}, 100);
		});
	}.on('didInsertElement')
});
