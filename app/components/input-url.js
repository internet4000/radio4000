import Ember from 'ember';

export default Ember.Component.extend({
	didInsertElement: function() {
		this._super();
		var self = this;

		// use jQuery's 'paste' event
		this.$('input').on('paste', function(event) {
			var input = Ember.$(this);
			// dirty hack, otherwise the pasted value isn't available yet
			setTimeout(function() {
				// send the action to whereever the component is placed
				self.sendAction('pasted', input.val());
			}, 100);
		});
	}
});
