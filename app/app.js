import Ember from 'ember';
import Resolver from './resolver';
import loadInitializers from 'ember-load-initializers';
import config from './config/environment';

let App;

Ember.MODEL_FACTORY_INJECTIONS = true;

App = Ember.Application.extend({
	rootElement: '#Radio4000',
	modulePrefix: config.modulePrefix,
	podModulePrefix: config.podModulePrefix,
	Resolver
});

// Change the class Ember adds to active elements
Ember.LinkComponent.reopen({
	activeClass: 'is-active'
});

loadInitializers(App, config.modulePrefix);

export default App;
