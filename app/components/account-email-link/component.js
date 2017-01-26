import Ember from 'ember';

export default Ember.Component.extend({
	actions: {
		link(email, password) {
			this.get('link')(email, password);
		}
}
});
