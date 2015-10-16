import Ember from 'ember';

/**
 * Dynamic bookmarklet link

 * Because we can't bind a property (the slug) into the href's javascript
 * we set the slug as 'data-slug' and replace it manually to avoid XSS attacks.
 */

export default Ember.Component.extend({
	slug: null,

	// binding properties with :javascript in templates is forbidden because of XSS
	// so we do this instead
	fixBookmarklet: Ember.on('didInsertElement', function () {
		const $link = this.$().children('a');
		const slug = $link.data('slug');
		const newHref = $link.attr('href').replace('TOBESLUGGED', slug);

		$link.attr('href', newHref);
	})
});
