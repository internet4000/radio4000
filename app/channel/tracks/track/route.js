import Ember from 'ember';

const {Route,
			 get,
			 set,
			 inject} = Ember;

export default Route.extend({
	headData: inject.service(),

	model(params) {
		return this.store
			.findRecord('track', params.track_id)
			.catch(error => {
				return this.transitionTo('channel.tracks')
			})
	},
	afterModel(model) {
		// Set meta tags
		const headData = get(this, 'headData')
		const channelTitle = model.get('channel.title')
		const channelImage = model.get('channel.image')
		const title = model.get('title')
		const body = model.get('body') || ''

		const description = `${body} ~ ${channelTitle}`
		// don't set the slug, because the r4 player
		// cannot start on a specific track from the oembed version
		// also we would like to set directly the medias's oembed,
		// aka put youtube / soundcloud player,
		// as such embed on the web is not made for long playback
		set(headData, 'slug', null)
		set(headData, 'title', title)
		set(headData, 'description', description)
		set(headData, 'image', channelImage)
	},

	deactivate() {
		// Reset meta tags when leaving the route.
		get(this, 'headData').setProperties({
			title: null,
			description: null,
			image: null
		})
	}
});
