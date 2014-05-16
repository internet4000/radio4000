var UsersRoute = Ember.Route.extend({
	model: function() {
		return this.store.findAll('user');
	}
});

export default UsersRoute;
