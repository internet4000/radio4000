var ApplicationRoute = Ember.Route.extend({
	actions: {
	  login: function() {
	    // auth.login('facebook');
	    this.get('auth').login();
	  },

	  logout: function() {
	    // auth.logout();
	    this.get('auth').logout();
	  }
	}
});

export default ApplicationRoute;
