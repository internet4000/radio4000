import Ember from 'ember';

export default Ember.Route.extend({
	model: function(params) {
		return this.store.find('channel').then(function(channels) {
			return channels.findBy('slug', params.channel_slug);
		});
	},

	// because we use slugs instead of ids in the url
	serialize: function(model) {
		return { channel_slug: model.get('slug') };
	},

	afterModel: function(model) {
		window.scrollTo(0,0);
		document.title = model.get('title') + ' - Radio4000';
		this.controllerFor('channel.edit').set('model', model);
	},

	// Reset doc title when leaving the route
	deactivate: function() {
		document.title = 'Radio4000';
	}
});
