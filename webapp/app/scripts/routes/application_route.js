App.ApplicationRoute = Ember.Route.extend({
	// setupController: function (controller, model) {
	// 	Ember.Instrumentation.subscribe('YT.onReady', {
	// 		before: function(name, timestamp, payload) {
	// 			console.log('Recieved ', name, ' at ' + timestamp + ' with payload: ', payload);
	// 			this.controllerFor('playback').send('onExternalPlay', payload);
	// 		},
	// 		after: function() {}
	// 	});
	// }
});

// This is the homepage route
App.IndexRoute = Ember.Route.extend({
	// Immediately switch to the sounds route
	beforeModel: function() {
		this.transitionTo('sounds');
	}
});
