import Ember from 'ember';
import ownerRouteMixin from 'radio4000/mixins/owner-route';

const {Route} = Ember;

export default Route.extend(ownerRouteMixin, {
	// Don't render into channel because we don't want channel templates here.
	renderTemplate() {
		this.render({
			into: 'application'
		});
	}
});
