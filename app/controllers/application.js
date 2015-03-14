import Ember from 'ember';

export default Ember.Controller.extend({
	// get gui state so we can update markup in this template as well
	needs: ['playback'],
	isMaximized: Ember.computed.alias('controllers.playback.isMaximized'),
	isPanelOpen: false,

	// show back button if we're on a nested channel (.) route
	// or on a track
	showBackButton: () => {
		var route = this.get('currentRouteName');
		// var formatedRoute = 'is-route-' + route;
		return route;
	}.property('currentRouteName'),

	// Detect iOS devices so we can tell it doesn't work
	iOS: () => {
		var iOS = /(iPad|iPhone|iPod)/g.test( navigator.userAgent );
		return iOS;
	}.property(),

	actions: {
		togglePanel: function() {
			this.toggleProperty('isPanelOpen');
		}
	}
});
