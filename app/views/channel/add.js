import Ember from 'ember';

export default Ember.View.extend({
	keyDown(event) {
		if (event.keyCode === 27) { // ESC
			this.get('controller').send('cancelEdit');
		}
	}
});
