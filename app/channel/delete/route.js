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
	afterModel() {
		const flashMessages = Ember.get(this, 'flashMessages');
		flashMessages.danger("You'll be missed! 🌇", {
			sticky: true
		})
	},

	actions: {
		willTransition() {
			const flashMessages = Ember.get(this, 'flashMessages');
			flashMessages.clearMessages().info('fiou…', {
				timeout: 400
			})
		}
	}
});
