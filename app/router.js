import Ember from 'ember';
import config from './config/environment';
import googlePageview from './mixins/google-pageview';

const Router = Ember.Router.extend(googlePageview, {
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function () {
  // pages
  this.route('about', function () {
      this.route('contact');
      this.route('technology');
  });
  this.route('dashboard');
  this.route('help');
  this.route('intro');
  this.route('404');
  this.route('styleguide', function () {
    this.route('typography');
    this.route('colors');
    this.route('forms');
    this.route('tabs');
  });
  this.route('login');
  this.route('logout');

  this.route('channels', {path: '/'}, function () {
      this.route('all');
      this.route('new');
      this.authenticatedRoute('history');
  });

  this.route('channel', {path: '/:slug'}, function () {
      this.authenticatedRoute('add');
      this.route('bookmarklet');
      this.authenticatedRoute('edit');
      this.authenticatedRoute('delete');
      this.route('dashboard', {});
      this.route('index', {path: '/'}, function () {
          this.route('track', {path: ':track_id', resetNamespace: true});
      });
      this.route('favorites');
      this.route('followers');
  });
  // Support deprecated channels urls. Needs to be defined before 'channel' route.
  this.route('channel-alias', {path: '/c/:slug'});

  this.route('feedback');
});

export default Router;
