import Ember from 'ember';

const {Controller, debug, inject, computed} = Ember;

export default Controller.extend({
	firebaseApp: inject.service(),
	auth: computed.oneWay('firebaseApp.auth'),
	actions: {
		linkAccount(provider) {
			console.log("provider:controler", provider );

			this.get('auth').currentUser.linkWithPopup(provider).then(function(result) {
				// Accounts successfully linked.
				var credential = result.credential;
				var user = result.user;
				// ...
			}).catch(function(error) {
				// Handle Errors here.
				// ...
			});

		}
	}
});
