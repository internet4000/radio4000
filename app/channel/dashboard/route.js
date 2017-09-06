import Ember from 'ember';
import resetScroll from 'radio4000/mixins/reset-scroll'

export default Ember.Route.extend(resetScroll, {
	renderTemplate() {
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
