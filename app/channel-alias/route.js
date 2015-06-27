import Ember from 'ember';

export default Ember.Route.extend({

	// because our channels used to be a /c/:slug we redirect
	// to our new /:slug pattern
	model(params) {
		this.transitionTo('/' + params.slug);
	}
});
