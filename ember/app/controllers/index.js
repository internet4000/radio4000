// most of this is duplicate code of app controller. should send events there instead?

var IndexController = Ember.ArrayController.extend({
	needs: ['auth'],

	init: function () {
		// this.authController = ;
		// this._super();
	},

	actions: {
		login: function(provider) {
			this.get('controllers.auth').authClient.login(provider);
		},
		logout: function() {
			this.get('controllers.auth').authClient.logout();
		}
	}
});

export default IndexController;
