import Route from '@ember/routing/route';

export default Route.extend({
	deactivate() {
		// Clear any unsaved changes.
		this.currentModel.rollbackAttributes()
		this._super(...arguments)
	}
});
