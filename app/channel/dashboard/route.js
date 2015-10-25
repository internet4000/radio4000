import Ember from 'ember';

export default Ember.Route.extend({
	renderTemplate: function () {
		// the template to render
		// the template to render into
		// the name of the outlet in that template
		// the controller to use for the template
		this.render('channel/dashboard', {
			into: 'channel',
			outlet: 'channel-widgets',
			controller: 'channel/dashboard'
		});
	}
});
