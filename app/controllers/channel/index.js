import Ember from 'ember';

export default Ember.Controller.extend({
	needs: ['channel', 'playback'],
	playback: Ember.computed.alias('controllers.playback'),
	canEdit: Ember.computed.alias('controllers.channel.canEdit'),

	// Helpers to show contextual UI helpers
	hasImage: Ember.computed.notEmpty('controllers.channel.model.image'),
	noTracks: Ember.computed.equal('model.length', 0),
	oneTrack: Ember.computed.equal('model.length', 1),
	moreTracks: Ember.computed.gt('model.length', 0),
	showHelp: Ember.computed('canEdit', 'model.[]', function() {
		return this.get('canEdit') && this.get('model.length') < 2;
	})
});
