import Ember from 'ember';
import ownerRouteMixin from 'radio4000/mixins/owner-route';

const {Route} = Ember;

export default Route.extend(ownerRouteMixin, {
	// Don't render into channel because we don't want channel templates here.
	renderTemplate() {
		this.render({
			into: 'application'
		});
	},

	setupController(controller, model) {
		this._super(controller, model);
		controller.set('initialSlug', model.get('slug'));
	},

	// Clear any unsaved changes.
	deactivate() {
		this.modelFor('channel').rollbackAttributes();
	}
});
