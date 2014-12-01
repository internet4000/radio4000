import Ember from 'ember';

export default Ember.View.extend({

	// setFocus: function() {
	// 	return this.$('input:first').focus();
	// }.on('didInsertElement'),

	keyDown: function(event) {
		if (event.keyCode === 27) { // "ESC"
			this.get('controller').send('cancel');
		}
	}
});
