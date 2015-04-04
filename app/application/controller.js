import Ember from 'ember';

export default Ember.Controller.extend({
	// get gui state so we can update markup in this template as well
	needs: ['playback'],
	isMaximized: Ember.computed.alias('controllers.playback.isMaximized'),
	isPanelOpen: false,

	// show back button if we're on a nested channel (.) route or on a track
	// showBackButton: Ember.computed('currentRouteName', function() {
	// 	var route = this.get('currentRouteName');
	// 	console.log(route);
	// 	return route;
	// }),

	actions: {
		// back() {
		// 	return true;
		// },
		togglePanel() {
			this.toggleProperty('isPanelOpen');
		}
	}
});
