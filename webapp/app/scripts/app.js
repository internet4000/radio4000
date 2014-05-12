// This creates an ember under the "App" namespace
App = Ember.Application.create({
	rootElement: '#Ember'
});

// Wait loading the Ember app until YouTube API is ready
// App.deferReadiness();

Ember.Application.initializer({
	name: 'youTube',
	initialize: function(container, application) {

		// App.deferReadiness();
		// App.advanceReadiness();

		$(function(){
			console.log('rdy');
		});
	}
});

// Ember.Application.initializer({
// 	name: 'soundcloud',
// 	after: 'youTube'
// 	initialize: function(container, application) {
// 		// this will run after the youtube initializer
// 	}
// });


// Change the class used on active elements by Ember
Ember.LinkView.reopen({
	activeClass: 'is-active'
});

// Order and include as you please
require('scripts/controllers/*');
require('scripts/components/*');
require('scripts/store');
require('scripts/models/*');
require('scripts/routes/*');
require('scripts/views/*');
require('scripts/router');
