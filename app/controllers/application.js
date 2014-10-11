import Ember from 'ember';

export default Ember.ObjectController.extend({
	needs: ['playback'],

	// get gui state so we can update markup in this template as well
	isMaximized: Ember.computed.alias('controllers.playback.isMaximized')
});
