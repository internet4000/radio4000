import Ember from 'ember';

export default Ember.Route.extend({

	// don't render into channel because we don't want channel templates here
	renderTemplate: function() {
		this.render({
			into: 'application'
		});
	},

	// Abort if user isn't allowed to edit
	// @TODO: this doesn't work on load because it runs too soon
	afterModel() {
		var canEdit = this.controllerFor('channel').get('canEdit');
		if (!canEdit) { this.transitionTo('channel.index', this.modelFor('channel')); }
	}
});
