import Ember from 'ember';

export default Ember.Route.extend({
	beforeModel(transition) {
		// Deprecation of old bookmarklet URLs "channel-slug/add?url=xxx&title=xxx" to "add?url=xxx&title=xxx"
		this.transitionTo('add', {queryParams: transition.queryParams});
	}
});
