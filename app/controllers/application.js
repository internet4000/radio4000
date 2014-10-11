import Ember from 'ember';

export default Ember.ObjectController.extend({
	needs: ['playback'],

	guiStateClass: Ember.computed.alias('controllers.playback.guiStateClass')
});
