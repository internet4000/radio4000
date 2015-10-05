import Ember from 'ember';

export default Ember.Route.extend({
	// because our channels used to be a /:channel_slug we redirect
	// to our new /:slug pattern
	model(params) {
		this.transitionTo('/' + params.slug);
	}
});
