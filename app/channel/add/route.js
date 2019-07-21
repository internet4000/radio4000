import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin'

export default Ember.Route.extend(AuthenticatedRouteMixin, {
	beforeModel(transition) {
		// Deprecation of old bookmarklet URLs "channel-slug/add?url=xxx&title=xxx" to "add?url=xxx&title=xxx"
		this.transitionTo('add', {queryParams: transition.queryParams});
	}
});
