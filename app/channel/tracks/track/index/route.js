import Ember from 'ember';
import Route from '@ember/routing/route'
import {mediaUrlParser} from 'media-url-parser'

const {inject,
			 get,
			 set} = Ember;

export default Route.extend({
	headData: inject.service(),

	renderTemplate: function() {
		this.render({
			into: 'application'
		})
	},
	afterModel(model) {
		// Set meta tags
		const headData = get(this, 'headData')
		const channelTitle = model.get('channel.title')
		const channelImage = model.get('channel.image')
		const body = model.get('body') || ''

		const description = `${body} ~ ${channelTitle}`
		// don't set the slug, because the r4 player
		// cannot start on a specific track from the oembed version
		// also we would like to set directly the medias's oembed,
		// aka put youtube / soundcloud player,
		// as such embed on the web is not made for long playback
		set(headData, 'slug', null)
		set(headData, 'description', description)
		set(headData, 'image', channelImage)

		// Enable youtube player embed for the track.
		const parsed = mediaUrlParser(model.url)
		if (parsed.provider === 'youtube') {
			set(headData, 'ytid', parsed.id)
		}
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
