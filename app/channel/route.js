import Ember from 'ember';

const { debug } = Ember;

export default Ember.Route.extend({
	model(params) {
		let slug = params.slug;

		return this.store.find('channel', {
			orderBy: 'slug',
			equalTo: slug
		})
		// this part is needed because emberfire: https://github.com/firebase/emberfire/issues/235
		.then((channels) => {
			return channels.findBy('slug', slug);
		});
	},

	// because we use slugs instead of ids in the url
	// tell ember what the 'slug' param maps to on our model
	serialize(model) {
		return { slug: model.get('slug') };
	},

	afterModel(model) {
		if (model) {
			document.title = model.get('title') + ' - Radio4000';
		}
	},

	activate: function() {
		window.scrollTo(0, 0);
	},

	deactivate() {
		// Reset doc title when leaving the route
		document.title = 'Radio4000';
	}

	// renderTemplate() {
	// 	this._super();
	// 	// update contextual nav
	// 	this.render('contextual-navigation/cn-channel', {
	// 		into: 'application',
	// 		outlet: 'contextual-navigation'
	// 	});
	// }
});
