import Ember from 'ember';

export default Ember.Route.extend({
	beforeModel: function() {
		// @todo, what the fuck here?
		// sign the user in
		Ember.debug('application beforemodel');
		return this.get('session').fetch(function(){
			Ember.debug('sucess');
		}, function(){
			Ember.debug('fail');
		});
	},

	actions: {
		logout() {
			this.get('session').close().then( () =>{
				// todo: why does before this it: "Preparing to transition from 'channels.index' to ' login'"
				Ember.debug('logged out, application.route.action.logout');
				this.transitionTo('application');
			});
		},
		back() {
			window.history.back();
		}
	}
});
