import Ember from 'ember';

export default Ember.Route.extend({

	// Abort if user isn't allowed to edit
	beforeModel: function() {
		var canEdit = this.controllerFor('channel').get('canEdit');
		if (!canEdit) { this.transitionTo('channel', this.modelFor('channel')); }
	},

	// model gets set in the channel route

	// render into the channel template
	renderTemplate: function() {
		this.render({
			into: 'channel',
			outlet: 'channel-header'
		});
	},

	setupController: function() {
		// indicate we're editing (used for changing buttons etc.)
		this.controllerFor('channel').set('isEditing', true);
	},

	// clear any unsaved changes
	deactivate: function() {
		this.controllerFor('channel').get('model').rollback();
		this.controllerFor('channel').set('isEditing', false);
	}
});
