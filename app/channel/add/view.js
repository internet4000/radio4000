import Ember from 'ember';

export default Ember.View.extend({

	// binding properties with :javascript in templates is forbidden because of XSS
	// so we do this instead
	fixBookmarklet: Ember.on('didInsertElement', function() {
		const $link = this.$('.Bookmarklet');
		let href = $link.attr('href').replace('TOBESLUGGED', $link.data('slug'));

		$link.attr('href', href);
	})
});
