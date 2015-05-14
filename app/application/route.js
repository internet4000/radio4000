import Ember from 'ember';

export default Ember.Route.extend({
	beforeModel: function() {
		// sign the user in
		console.log('application beforemodel');
		return this.get('session').fetch(function(){
			console.log('sucess');
		}, function(){
			console.log('fail');
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
