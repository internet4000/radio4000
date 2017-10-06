import Route from '@ember/routing/route';

export default Route.extend({
	// Deprecated: channel routes used to be `/c/:channel_slug`.
	// here we redirect to the current, real URL.
	model(params) {
		this.replaceWith(`/${params.channel_slug}`);
	}
});
