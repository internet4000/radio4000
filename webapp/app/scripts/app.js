// This creates an ember under the "App" namespace
App  = Window.App = Ember.Application.create();

// Change the class used on active elements by Ember
Ember.LinkView.reopen({
	activeClass: 'is-active'
});

// Order and include as you please
require('scripts/controllers/*');
require('scripts/store');
require('scripts/models/*');
require('scripts/routes/*');
require('scripts/views/*');
require('scripts/router');
