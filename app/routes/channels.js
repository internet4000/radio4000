import Ember from 'ember';

export default Ember.Route.extend({
	model: function() {
		return this.store.find('channel');
	},
	renderTemplate: function() {
		// because we overwrite the renderTemplate method
		// we need to tell it to also render the default template
		this.render();

		// and update nav bar
		this.render('contextual-navigation/cn-channels', {
			into: 'application',
			outlet: 'contextual-navigation'
		});
	}
});
