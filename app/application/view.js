import Ember from 'ember';

export default Ember.View.extend({
	didInsertElement() {
		var self = this;

		// Remove our dummy app with inline styles
		Ember.$('.DummyApp').remove();

		// close on top bar, links in the panel nav and on the overlay
		this.$().on('click.app', '.SiteLogo, .PanelNav a, .PanelNav-overlay', function() {
			Ember.run.schedule('afterRender', () => {
				self.set('controller.isPanelOpen', false);
			});
		});
	},

	willDestroyElement() {
		this.$().off('click.app');
	}
});
