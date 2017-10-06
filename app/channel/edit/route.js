import Route from '@ember/routing/route';
import ownerRouteMixin from 'radio4000/mixins/owner-route'
import resetScroll from 'radio4000/mixins/reset-scroll'

export default Route.extend(ownerRouteMixin, resetScroll, {
	setupController(controller, model) {
		this._super(controller, model)
		controller.set('initialSlug', model.get('slug'))
	},

	// Clear any unsaved changes.
	deactivate() {
		this.modelFor('channel').rollbackAttributes()
	}
})
