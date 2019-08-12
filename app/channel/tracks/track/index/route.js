import Route from '@ember/routing/route'
import {inject as service} from '@ember/service'
import {get, set} from '@ember/object'

export default Route.extend({
	headData: service(),

	renderTemplate: function() {
		this.render({
			into: 'application'
		})
	},

	afterModel(model) {
		// Set meta tags
		const headData = get(this, 'headData')

		const channelTitle = model.get('channel.title')
		const body = model.get('body') || ''
		const description = `${body} ~ ${channelTitle}`
		set(headData, 'description', description)

		// don't set the slug, because the r4 player
		// cannot start on a specific track from the oembed version
		// also we would like to set directly the medias's oembed,
		// aka put youtube / soundcloud player,
		// as such embed on the web is not made for long playback
		set(headData, 'slug', null)

		// Enable youtube player embed for the track.
		set(headData, 'mediaUrl', model.url)
	},

	deactivate() {
		// Reset meta tags when leaving the route.
		get(this, 'headData').setProperties({
			description: null,
			mediaUrl: null
		})
	}
});
