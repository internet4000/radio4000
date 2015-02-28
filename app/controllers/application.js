import Ember from 'ember';

export default Ember.Controller.extend({
	// get gui state so we can update markup in this template as well
	needs: ['playback'],
	isMaximized: Ember.computed.alias('controllers.playback.isMaximized'),
	isPanelOpen: false,

	showBackButton: function() {
		return !this.get('currentRouteName').indexOf('channel.');
	}.property('currentRouteName'),

	actions: {
		togglePanel: function() { this.toggleProperty('isPanelOpen'); },
		openPanel: function() { this.set('isPanelOpen', true); },
		closePanel: function() { this.set('isPanelOpen', false); }
	},

	redirectIfLoggedIn: function() {
		var authed = this.get('session.authed');
		var userChannel = this.get('session.userChannel');

		// forces you to create a channel
		if (authed && !userChannel) {
			this.transitionToRoute('new');
		} else {
			this.transitionToRoute('/');
		}
	}.observes('session.user.id')
});
