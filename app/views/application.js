import Ember from 'ember';

export default Ember.View.extend({
	didInsertElement() {
		// close on top bar, links in the panel nav and on the overlay
		this.$().on('click.app', '.SiteLogo, .SitePanelNav a, .SitePanelNavOverlay', () => {
			Ember.run( () => this.set('controller.isPanelOpen', false) );
		});
	},

	willDestroyElement() {
		this.$().off('click.app');
	}
});
