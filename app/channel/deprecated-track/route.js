import Route from '@ember/routing/route';

export default Route.extend({
	// Redirect the now deprecated channel/:track_id route
	// to our new one. We can completely remove this once
	// we no longer care about the old track URLs.
	redirect(model) {
		this._super(...arguments)
		this.transitionTo('channel.tracks.track', model)
	}
});
