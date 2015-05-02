import Ember from 'ember';

export default Ember.View.extend({
	keyDown(event) {
		if (event.keyCode === 27) { // ESC
			this.get('controller').send('cancelEdit');
		}
	},

	// binding properties with :javascript in templates is forbidden because of XSS
	// so we do this instead
	fixBookmarklet: Ember.on('didInsertElement', function() {
		const $link = this.$('.Bookmarklet');
		let href = $link.attr('href').replace('TOBESLUGGED', $link.data('slug'));

		$link.attr('href', href);
	})
});
