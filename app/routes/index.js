import Ember from 'ember';

export default Ember.Route.extend({
	activate: function() {
		Ember.$('.SiteLogo').addClass('is-translated');
	},
	deactivate: function() {
		Ember.$('.SiteLogo').removeClass('is-translated');
	}
});
