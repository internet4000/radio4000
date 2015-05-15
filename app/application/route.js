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
			this.get('session').close();
		},
		back() {
			window.history.back();
		}
	}
});
