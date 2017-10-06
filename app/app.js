import Ember from 'ember';
import Resolver from './resolver';
import loadInitializers from 'ember-load-initializers';
import config from './config/environment';
import RSVP from 'rsvp';
import 'npm:lazysizes/plugins/attrchange/ls.attrchange';
import 'npm:lazysizes';

const App = Ember.Application.extend({
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
RSVP.on('error', reason => {
	// An aborted transition propogates an error to RSVP
	if (reason.name !== 'TransitionAborted') {
		Ember.debug(reason)
	}
});

// Expose the databaseURL so `radio4000-player` can catch it.
window.r4 = {};
window.r4.databaseURL = config.firebase.databaseURL;

loadInitializers(App, config.modulePrefix);

export default App;
