import Ember from 'ember';

export default Ember.View.extend({
	keyDown: function(event) {
		// close 'add track' on esc key
		if (event.keyCode === 27) {
			this.get('controller').send('cancel');
		}
	}
});
