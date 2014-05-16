var ApplicationController = Ember.Controller.extend({
	needs: ['auth'],

	init: function () {
		this.authController = this.get('controllers.auth');
		// Ember.debug('authCtrl: ' + authCtrl);
		// this._super();
	},

	actions: {
		login: function() {
			this.get('authController').authClient.login('google');
		},
		logout: function() {
			this.get('authController').authClient.logout();
		}
	}
});

export default ApplicationController;
