import Ember from 'ember';

export default Ember.ArrayController.extend({
	needs: ['channel', 'playback'],
	canEdit: Ember.computed.alias('controllers.channel.canEdit'),
	playback: Ember.computed.alias('controllers.playback'),

	// Sort by newest on top
	sortProperties: ['created'],
	sortAscending: false,

	// Keep track of which track we're currently editing
	currentTrackComponent: null,

	// actions: {
	// 	// sortBy: function(property) {
	// 	// 	this.set('sortProperties', [property]);
	// 	// 	this.set('sortAscending', !this.get('sortAscending'));
	// 	// }
	// }

	// Helpers to show contextual UI helpers
	showHelp: function() {
		return this.get('canEdit') && this.get('model.length') < 2;
	}.property('canEdit', 'model.[]'),

	noTracks: function() {
		return this.get('model.length') === 0;
	}.property('model.[]'),

	oneTrack: function() {
		return this.get('model.length') === 1;
	}.property('model.[]'),

	moreTracks: function() {
		return this.get('model.length') > 0;
	}.property('model.[]'),

	hasImage: function() {
		return this.get('controllers.channel.model.image');
	}.property('channel.model.image')
});
