import Ember from 'ember';

export default Ember.View.extend({
	didInsertElement: function() {
		this._super();
		this.$('input:first').focus();
	},
	keyDown: function(event) {
		if (event.keyCode === 27) { // "ESC"
			this.get('controller').send('cancel');
		}
	}
});
