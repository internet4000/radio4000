import Ember from 'ember';

export default Ember.Controller.extend({
	needs: ['channel', 'playback'],

	canEdit: Ember.computed.alias('controllers.channel.canEdit'),
	playback: Ember.computed.alias('controllers.playback'),

	// Helpers to show contextual UI helpers
	showHelp: function() {
		return this.get('canEdit') && this.get('model.length') < 2;
	}.property('canEdit', 'model.[]'),

	hasImage: function() {
		return this.get('controllers.channel.model.image');
	}.property('channel.model.image'),

	noTracks: function() {
		return this.get('model.length') === 0;
	}.property('model.[]'),

	oneTrack: function() {
		return this.get('model.length') === 1;
	}.property('model.[]'),

	moreTracks: function() {
		return this.get('model.length') > 0;
	}.property('model.[]')
});
