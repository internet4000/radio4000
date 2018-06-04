import Route from '@ember/routing/route'

export default Route.extend({
	setupController(controller, model) {
		controller.set('initialSlug', model.get('slug'))
		this._super(...arguments)
	},

	deactivate() {
		// Clear any unsaved changes.
		this.modelFor('settings').rollbackAttributes()
	}
})
