import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

export default Router.map(function() {
  // pages
  this.route('about', function() {
    this.route('contact');
    this.route('log');
    this.route('technology');
  });
  this.route('bookmarklet');
  this.route('dashboard');
  this.route('help', function() { /* help.index */ });
  this.route('intro');
  this.route('log');
  this.route('signin');
  this.route('stats');
  this.route('styleguide', function() {
     this.route('colors');
     this.route('typography');
     this.route('forms');
 });

  // channels
  this.resource('channels', { path: '/' }, function() {
    this.route('all');
    this.route('new');
  });

  // channel
  this.resource('channel', { path: '/c/:slug' }, function() {
    this.route('index', { path: '/' }, function() {
        this.resource('track', { path: ':track_id' });
    });
    this.route('favorites');
    this.route('followers');
    this.route('add'); // add a track to channel
    this.route('edit'); // edit channel
    this.route('delete'); // permanently remove channel and its referenes from DB
  });
});
