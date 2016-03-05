/* global document */
import Ember from 'ember';

export default Ember.Route.extend({
	afterModel() {
		document.title = 'About Radio4000';
	},
	deactivate() {
		document.title = 'Radio4000';
	}
});
