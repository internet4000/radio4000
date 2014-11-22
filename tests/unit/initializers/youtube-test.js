import Ember from 'ember';
import { initialize } from 'radio4000/initializers/youtube';

var container, application;

module('YoutubeInitializer', {
  setup: function() {
    Ember.run(function() {
      container = new Ember.Container();
      application = Ember.Application.create();
      application.deferReadiness();
    });
  }
});

// Replace this with your real tests.
test('it works', function() {
  initialize(container, application);

  // you would normally confirm the results of the initializer here
  ok(true);
});

