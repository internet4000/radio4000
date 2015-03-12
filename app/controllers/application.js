import Ember from 'ember';

export default Ember.Controller.extend({
	// get gui state so we can update markup in this template as well
	needs: ['playback'],
	isMaximized: Ember.computed.alias('controllers.playback.isMaximized'),
	isPanelOpen: false,

	// show back button if we're on a nested channel (.) route
	// or on a track
	showBackButton: function() {
		var route = this.get('currentRouteName');
		// var formatedRoute = 'is-route-' + route;
		return route;
	}.property('currentRouteName'),

	// Detect iOS devices so we can tell it doesn't work
	iOS: function() {
		var iOS = /(iPad|iPhone|iPod)/g.test( navigator.userAgent );
		return iOS;
	}.property(),

	actions: {
		togglePanel: function() { this.toggleProperty('isPanelOpen'); },
		openPanel: function() { this.set('isPanelOpen', true); },
		closePanel: function() { this.set('isPanelOpen', false); }
	}
});
