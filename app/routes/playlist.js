import Ember from 'ember';
import DocumentTitleMixin from '../mixins/document-title';

export default Ember.Route.extend(DocumentTitleMixin, {
	// title: function() {
	// 	return 'Hey';
	// }.property('model.title'),
	// // title: 'dsadsa - Radio4000',
	// titleSpecificityIncreases: true,

	model: function(params) {
		// return this.modelFor('playlists').findBy('slug', params.playlist_slug);
		return this.store.find('playlist', params.playlist_id).then(function(){
			// this doesn't work because id (= slug) should use findby and emberfire meh
		}, function() {
			// Ember.warn('not so much');
			this.modelBySlug(params);
		}.bind(this));
	},

	// because we use slugs instead of ids in the url
	// we need to tell ember that
	serialize: function(model) {
		return { playlist_id: model.get('slug') };
	},

	// but it doesn't work with emberfire, so here's a manual fallback
	// unfortunately it needs to go through all playlists to find the right one
	// but it's actually not that slow, YET
	modelBySlug: function(params) {
		this.store.find('playlist').then(function(playlists) {
			Ember.debug('Looking for a playlist among aaaall playlists…');
			playlists.forEach(function(playlist) {
				if (playlist.get('slug') === params.playlist_id) {
					Ember.debug('found it!');
					this.controllerFor('playlist').set('model', playlist);
				}
			}.bind(this));
		}.bind(this));
	},

	// afterModel: function(model) {
	// 	// Set the document title
	// 	// var title = this.modelFor('playlist').get('title');
	// 	// if (!title) { return false; }
	// 	// document.title = title + ' - Radio4000';
	// },

	deactivate: function() {
		// Make sure playlist description is closed
		this.controller.set('isExpanded', false);
	}
});
