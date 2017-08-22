/* eslint array-callback-return:0 */
import Ember from 'ember';
import config from './config/environment';
import googlePageview from './mixins/google-pageview';

const Router = Ember.Router.extend(googlePageview, {
    location: config.locationType,
    rootURL: config.rootURL
});

Router.map(function () {
    this.route('about', function () {
        this.route('intro', {path: '/'});
        this.route('contact');
    });
    this.route('dashboard');
    this.route('404');
    this.route('styleguide', function () {
        this.route('typography');
        this.route('colors');
        this.route('forms');
        this.route('tabs');
    });
    this.route('channels', {path: '/'}, function () {
        this.route('all');
        this.route('new');
        this.authenticatedRoute('history');
    });
  this.route('channel', {path: '/:channel_slug'}, function () {
    this.route('index', {path: '/'});
    this.route('tracks', function () {
      this.route('track', {path: '/:track_id'}, function() {
        this.route('index', {path: '/'});
        this.route('edit');
      });
    });
      this.authenticatedRoute('add');
      this.authenticatedRoute('edit');
      this.authenticatedRoute('delete');
      this.route('dashboard');
      this.route('favorites');
      this.route('followers');
    });
    this.route('feedback');
    this.authenticatedRoute('add');
    this.authenticatedRoute('bookmarklet');
    // Support deprecated channels urls. Needs to be defined before 'channel' route.
    this.route('channel-alias', {path: '/c/:channel_slug'});
    this.route('auth', function () {
        this.route('signup');
        this.route('login');
        this.authenticatedRoute('logout');
        this.authenticatedRoute('settings');
    });
});

export default Router;
