import Ember from 'ember';

export default Ember.Route.extend({
	afterModel() {
		document.title = 'Discover Radio4000';
	},
	deactivate() {
		document.title = 'Radio4000';
	}
});
