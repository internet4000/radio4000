import Ember from 'ember';

export default Ember.View.extend({
	keyDown: function(event) {
		if (event.keyCode === 27) { // ESC
			this.get('controller').send('cancel');
		}
	}
});
