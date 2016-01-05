import Ember from 'ember';

export default Ember.Service.extend({
	isMinimal: false,
	isFullscreen: false,

	/**
		left panel api
	 */
	isPanelLeftVisible: true,
	showPanelLeft() {
		this.set('isPanelLeftVisible', true);
	},
	hidePanelLeft() {
		this.set('isPanelLeftVisible', false);
	},
	togglePanelLeft() {
		this.toggleProperty('isPanelLeftVisible');
	}
});
