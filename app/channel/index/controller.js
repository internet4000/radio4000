import Ember from 'ember';

export default Ember.Controller.extend({
	queryParams: ['tags'],

	// these are needed to pass some props down to tracks-list component
	needs: ['channel', 'playback'],
	playback: Ember.computed.alias('controllers.playback'),
	canEdit: Ember.computed.alias('controllers.channel.canEdit'),

	// Helpers to show contextual UI helpers
	hasImage: Ember.computed.notEmpty('model.coverImage')

	// noTracks: Ember.computed.equal('model.tracks.length', 0),
	// oneTrack: Ember.computed.equal('model.tracks.length', 1),
	// moreTracks: Ember.computed.gt('model.tracks.length', 0),
	// showHelp: Ember.computed('canEdit', 'model.tracks.[]', function() {
	// 	return this.get('canEdit') && this.get('model.tracks.length') < 2;
	// })
});
