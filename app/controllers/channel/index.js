import Ember from 'ember';

export default Ember.Controller.extend({
	needs: ['channel', 'playback'],
	canEdit: Ember.computed.alias('controllers.channel.canEdit'),
	playback: Ember.computed.alias('controllers.playback'),

	// Helpers to show contextual UI helpers
	showHelp: function() {
		return this.get('canEdit') && this.get('model.length') < 2;
	}.property('canEdit', 'model.[]'),

	hasImage: Ember.computed.notEmpty('controllers.channel.model.image'),
	noTracks: Ember.computed.equal('model.length', 0),
	oneTrack: Ember.computed.equal('model.length', 1),
	moreTracks: Ember.computed.gt('model.length', 0)
});
