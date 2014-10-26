import Ember from 'ember';

export default Ember.Route.extend({

	model: function(params) {
		// return this.modelFor('channels').findBy('slug', params.channel_slug);
		return this.store.find('channel', params.channel_id).then(function(){
			// this doesn't work because id (= slug) should use findby and emberfire meh
		}, function() {
			// Ember.warn('not so much');
			this.modelBySlug(params);
		}.bind(this));
	},

	// because we use slugs instead of ids in the url
	// we need to tell ember that
	serialize: function(model) {
		return { channel_id: model.get('slug') };
	},

	// but it doesn't work with emberfire, so here's a manual fallback
	// unfortunately it needs to go through all channels to find the right one
	// but it's actually not that slow, YET
	modelBySlug: function(params) {
		this.store.find('channel').then(function(channels) {
			Ember.debug('Looking for a channel among aaaall channels…');
			channels.forEach(function(channel) {
				if (channel.get('slug') === params.channel_id) {
					Ember.debug('found it!');

					// set the mode where we need it
					this.controllerFor('channel').set('model', channel);
					this.controllerFor('channel.edit').set('model', channel);

					// set document title
					document.title = channel.get('title') + ' - Radio4000';
				}
			}.bind(this));
		}.bind(this));
	},

	// @TODO: this hook isn't reliable until we fix slug hack
	// afterModel: function(model) {},

	deactivate: function() {
		// Make sure channel description is closed
		this.controller.set('isExpanded', false);
		// Reset doc title
		document.title = 'Radio4000';
	}
});
