/* global document, window */
import Ember from 'ember';

const {Route, debug, get, warn} = Ember;

export default Route.extend({
	model(params) {
		return this.store.query('channel', {
			orderBy: 'slug',
			equalTo: params.channel_slug
		}).then(data => data.get('firstObject'));
	},

	afterModel(model) {
		if (model) {
			document.title = `${model.get('title')} - Radio4000`;
		}
	},

	serialize(model) {
		return {channel_slug: model.get('slug')};
	},

	activate() {
		window.scrollTo(0, 0);
	},

	deactivate() {
		// Reset doc title when leaving the route
		document.title = 'Radio4000';
	},

	actions: {
		deleteTrack(track) {
			const flashMessages = get(this, 'flashMessages');
			track.get('channel').then(channel => {
				channel.get('tracks').then(tracks => {
					track.destroyRecord().then(() => {
						debug('Deleted track');
						flashMessages.warning('Deleted your track');
					}, () => {
						warn('Could not delete track');
					});
				});
			});
		}
	}
});
