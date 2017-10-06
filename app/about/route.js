/* global document */
import Route from '@ember/routing/route';
import resetScroll from 'radio4000/mixins/reset-scroll'

export default Route.extend(resetScroll, {
	afterModel() {
		document.title = 'About Radio4000';
	},
	deactivate() {
		document.title = 'Radio4000';
	}
});
