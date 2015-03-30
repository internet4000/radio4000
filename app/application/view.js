import Ember from 'ember';

export default Ember.View.extend({
	didInsertElement() {
		var self = this;

		// close on top bar, links in the panel nav and on the overlay
		this.$().on('click.app', '.SiteLogo, .SitePanelNav a, .SitePanelNavOverlay', function() {
			Ember.run(function() {
				self.set('controller.isPanelOpen', false);
			});
		});
	},

	willDestroyElement() {
		this.$().off('click.app');
	}
});
