import Ember from 'ember';

export default Ember.Route.extend({
	activate: function() {
		Ember.$('.SiteLogo').addClass('is-hidden');
	},
	deactivate: function() {
		Ember.$('.SiteLogo').removeClass('is-hidden');
	}
});
