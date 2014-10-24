import Ember from 'ember';

export default Ember.View.extend({
	didInsertElement: function() {
		this._super();
		// autofocus on the url field
		this.$('input:first').focus();
	},
	keyDown: function(event) {
		// close 'add track' on esc key
		if (event.keyCode === 27) {
			this.get('controller').send('close');
		}
	}
});
