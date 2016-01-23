import Ember from 'ember';
import Cookies from 'ember-cli-js-cookie';

const {computed} = Ember;

export default Ember.Service.extend({
	isMinimal: false,
	isFullscreen: false,

	/**
		left panel api
	 */
	// isPanelLeftVisible: true,
	isPanelLeftVisible: computed({
		get() {
			// if the cookie is undefined (not set), it returns true
			// or if the cookie has 'true' as value, return true
			return Cookies.get('isPanelOpen') === undefined || Cookies.get('isPanelOpen') === 'true';
		},
		set(key, value) {
			Cookies.set('isPanelOpen', value, {expires: 7});
			return value;
		}
	}),
	togglePanelLeft() {
		this.toggleProperty('isPanelLeftVisible');
	}
});
