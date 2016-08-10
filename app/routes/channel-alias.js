import Ember from 'ember';

export default Ember.Route.extend({
	// Deprecated: channel routes used to be `/c/:channel_slug`.
	// here we redirect to the current, real URL.
	model(params) {
		this.replaceWith(`/${params.channel_slug}`);
	}
});
