import Ember from 'ember';
import Resolver from './resolver';
import loadInitializers from 'ember-load-initializers';
import config from './config/environment';
import RSVP from 'rsvp';

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

// https://guides.emberjs.com/v2.11.0/configuring-ember/debugging/#toc_errors-within-an-code-rsvp-promise-code
RSVP.on('error', err => {
	// Ember.debug('RSVP caught an error: ' + error);
	console.log(err);
	Ember.assert(false, err);
});

loadInitializers(App, config.modulePrefix);

export default App;
