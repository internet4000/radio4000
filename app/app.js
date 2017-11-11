import Application from '@ember/application';
import Resolver from './resolver';
import loadInitializers from 'ember-load-initializers';
import config from './config/environment';
import RSVP from 'rsvp';
import LinkComponent from '@ember/routing/link-component';
import {debug} from '@ember/debug'
import 'npm:lazysizes/plugins/attrchange/ls.attrchange';
import 'npm:lazysizes';

const App = Application.extend({
	rootElement: '#Radio4000',
	modulePrefix: config.modulePrefix,
	podModulePrefix: config.podModulePrefix,
	Resolver
});

// Change the class Ember adds to active elements
LinkComponent.reopen({
	activeClass: 'is-active'
});

// https://guides.emberjs.com/v2.11.0/configuring-ember/debugging/#toc_errors-within-an-code-rsvp-promise-code
RSVP.on('error', reason => {
	// An aborted transition propogates an error to RSVP
	if (reason.name !== 'TransitionAborted') {
		debug(reason)
	}
})

// Expose the databaseURL so `radio4000-player` can catch it.
window.r4 = {};
window.r4.databaseURL = config.firebase.databaseURL;

loadInitializers(App, config.modulePrefix);

export default App;
