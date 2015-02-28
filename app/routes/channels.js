import Ember from 'ember';

export default Ember.Route.extend({

	model: function() {
		return this.store.find('channel');
	},

	// renderTemplate: function() {

	// 	this.render('contextual-navigation/cn-channels', {
	// 		into: 'application',
	// 		outlet: 'contextual-navigation'
	// 	});
	// }
});
