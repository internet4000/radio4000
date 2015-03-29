import Ember from 'ember';

export default Ember.Route.extend({
	model() {
		return this.store.find('user');
	},
	afterModel(model) {
		model.forEach(function(user) {
			console.log(user.get('name'));
		});
	}
});
