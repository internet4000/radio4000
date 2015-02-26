import Ember from 'ember';

export default Ember.Controller.extend({
	// get gui state so we can update markup in this template as well
	needs: ['playback'],
	isMaximized: Ember.computed.alias('controllers.playback.isMaximized'),
	isPanelOpen: false,

	actions: {

		// open panel
		openPanel: function() {
			this.toggleProperty('isPanelOpen');
		},
		closePanel: function() {
			this.toggleProperty('isPanelOpen');
		}
	}

});
