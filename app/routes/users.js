import Ember from 'ember';

export default Ember.Route.extend({
	model: function() {
		return this.store.find('user');
	},
	afterModel: function(model) {
		model.forEach(function(user) {
			console.log(user.get('name'));
		});
	}
});
