import Ember from 'ember';

const { Controller, computed } = Ember;

export default Controller.extend({
	userChannel: computed.alias('session.currentUser.channels.firstObject'),
	actions: {
		processStripeToken(token, args) {
			console.log('token & args', token, args);
			/* $.ajax({
			 *   type: 'POST',
			 *   url: 'http://localhost:3000/payments',
			 *   data: { name: "John", location: "Boston" }
			 * }).then(answer => {
				 console.log('answer', answer)
				 })*/
		}
	}
});
