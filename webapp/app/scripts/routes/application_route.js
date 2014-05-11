// App.ApplicationRoute = Ember.Route.extend({});

App.IndexRoute = Ember.Route.extend({
	beforeModel: function() {
		this.transitionTo('sounds');
	}
});
