import Ember from 'ember';

export default Ember.View.extend({
	keyDown: function(event) {
		// close 'edit channel' on esc key
		if (event.keyCode === 27) {
			this.get('controller').send('cancelEdit');
		}
	}
});
