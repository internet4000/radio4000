/* global document */
import Ember from 'ember';
import resetScroll from 'radio4000/mixins/reset-scroll'

export default Ember.Route.extend(resetScroll, {
	afterModel() {
		document.title = 'About Radio4000';
	},
	deactivate() {
		document.title = 'Radio4000';
	}
});
