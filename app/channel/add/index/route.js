import Ember from 'ember';

export default Ember.Route.extend({
	// clear any unsaved changes
	deactivate() {
		this.get('currentModel').rollbackAttributes();
	}
});
