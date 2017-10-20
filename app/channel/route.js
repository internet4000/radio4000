/* eslint camelcase:0 */
/* global document, window */
import Ember from 'ember';

const {Route, get, set, inject} = Ember;

export default Route.extend({
	headData: inject.service(),
	model(params) {
		return this.store.query('channel', {
			orderBy: 'slug',
			equalTo: params.channel_slug
		}).then(data => data.get('firstObject'));
	},
	afterModel(model) {
		if (!model) {
			this.transitionTo('404');
			return
		}
		this.setHeadData(model)
	},
	serialize(model) {
		return {channel_slug: model.get('slug')};
	},
	activate() {
		window.scrollTo(0, 0);
	},
	deactivate() {
		// Reset meta tags when leaving the route.
		get(this, 'headData').setProperties({
			title: null, description: null, image: null, slug: null
		})
	},
	setHeadData(model) {
		const headData = get(this, 'headData')
		// const title = `${model.get('title')} - Radio4000`;
		const title = model.get('title')
		const slug = model.get('slug')
		const body = model.get('body')
		set(headData, 'title', title)
		set(headData, 'slug', slug)
		if (body) {
			set(headData, 'description', body)
		}
		// `model.get('coverImage.src')` doesn't seem to work
		model.get('images').then(images => {
			const src = images.get('lastObject.src')
			if (src) {
				set(headData, 'image', src)
			}
		})
	}
});
