import Ember from 'ember';

export default Ember.Component.extend({
	didInsertElement: function() {
		this._super();
		var self = this;
		var input = this.$('input');

		// autofocus on the url field
		input.focus();

		// use jQuery's 'paste' event
		input.on('paste', function() {
			// dirty hack, otherwise the pasted value isn't available yet
			setTimeout(function() {
				// send the action to whereever the component is placed
				self.sendAction('pasted', input.val());
			}, 100);
		});
	}
});
