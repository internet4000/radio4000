import Ember from 'ember';

export default Ember.Controller.extend({
	// queryParams: ['tags'],

	// these are needed to pass some props down to tracks-list component
	needs: ['channel', 'playback'],
	// canEdit: Ember.computed.alias('controllers.channel.canEdit'),

	// Helpers to show contextual UI helpers
	hasImage: Ember.computed.notEmpty('model.coverImage'),

	// todo remove this
	// it's only needed because of our model hook which doesn't update deleted tracks
	filteredModel: Ember.computed.filter('model.@each.isDeleted', function(item) {
		return true;// !item.get('isDeleted');
	}),

	sortProperties: ['created:desc'],
	sortedModel: Ember.computed.sort('model', 'sortProperties')

	// noTracks: Ember.computed.equal('model.tracks.length', 0),
	// oneTrack: Ember.computed.equal('model.tracks.length', 1),
	// moreTracks: Ember.computed.gt('model.tracks.length', 0),
	// showHelp: Ember.computed('canEdit', 'model.tracks.[]', function() {
	// 	return this.get('canEdit') && this.get('model.tracks.length') < 2;
	// })
});
