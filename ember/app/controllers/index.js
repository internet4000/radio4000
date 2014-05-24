// most of this is duplicate code of app controller. should send events there instead?

var IndexController = Ember.ArrayController.extend({
	needs: ['auth'],

	init: function () {
		this.authController = this.get('controllers.auth');
		// this._super();
	},

	actions: {
		login: function(provider) {
			this.get('authController').authClient.login(provider);
		},
		logout: function() {
			this.get('authController').authClient.logout();
		}
	}
});

export default IndexController;
