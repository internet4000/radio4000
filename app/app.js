/*global ga*/
import Ember from 'ember';
import Resolver from 'ember/resolver';
import loadInitializers from 'ember/load-initializers';
import config from './config/environment';

Ember.MODEL_FACTORY_INJECTIONS = true;

var App = Ember.Application.extend({
  rootElement: '#Radio4000',
  modulePrefix: config.modulePrefix,
  podModulePrefix: config.podModulePrefix,
  Resolver: Resolver
});

// Change the class Ember adds to active elements
Ember.LinkView.reopen({
	activeClass: 'is-active'
});

// Notify Google Analytics of page transitions
Ember.Router.reopen({
  notifyGoogleAnalytics: Ember.on('didTransition', function() {
    return ga('send', 'pageview', {
        'page': this.get('url'),
        'title': this.get('url')
      });
  })
});

loadInitializers(App, config.modulePrefix);

export default App;
