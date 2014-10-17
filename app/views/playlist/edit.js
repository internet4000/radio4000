import Ember from 'ember';

export default Ember.View.extend({
	didInsertElement: function() {
		// this._super();
		// var self = this;
		// var input = this.$('input');

		// autofocus on the url field
		this.$('input:first');
	}

	// @todo conflicts with keydown of add.js

	// ,
	// keyDown: function(event) {
	// 	// close 'add track' on esc key
	// 	if (event.keyCode === 27) {
	// 		this.get('controller').send('close');
	// 	}
	// }
});
