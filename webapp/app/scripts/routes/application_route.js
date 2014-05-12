App.ApplicationRoute = Ember.Route.extend({});

// This is the homepage route
App.IndexRoute = Ember.Route.extend({
	// Immediately switch to the sounds route
	beforeModel: function() {
		this.transitionTo('sounds');
	}
});
