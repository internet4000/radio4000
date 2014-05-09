Webapp.ApplicationRoute = Ember.Route.extend({});

Webapp.IndexRoute = Ember.Route.extend({
	beforeModel: function() {
		this.transitionTo('sounds');
	}
});
