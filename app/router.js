import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  // pages
  this.route('about', function () {
    this.route('contact');
    this.route('technology');
  });
  this.route('bookmarklet');
  this.route('dashboard');
  this.route('help', function () { /* help.index */ });
  this.route('intro');
  this.route('404');
  this.route('styleguide', function () {
    this.route('colors');
    this.route('typography');
    this.route('forms');
  });
  this.route('login');
  this.route('logout');

  // channels
  this.route('channels', { path: '/' }, function () {
    this.route('all');
    this.route('new');
  });

  // channel - IMPORTANT! This definition needs to come last —
  // otherwise it'll overwrite the above routes. We want the opposite.
  this.route('channel-alias', { path: '/c/:slug' });
  this.route('channel', { path: '/:slug' }, function () {
    this.route('index', { path: '/' }, function () {
        this.route('track', { path: ':track_id', resetNamespace: true });
    });
    this.route('favorites');
    this.route('followers');
    // add a track to channel
    this.route('add');
    // edit channel
    this.route('edit');
    // permanently remove channel and its referenes from DB
    this.route('delete');
    this.route('dashboard', {});
  });
});

export default Router;
