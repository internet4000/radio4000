import Ember from 'ember';

const { Controller, computed } = Ember;

export default Controller.extend({
	userChannel: computed.alias('session.currentUser.channels.firstObject'),
	actions: {
		processStripeToken(payment, args) {
			console.log('payment', payment);
			console.log('args', args);
			fetch('http://localhost:3000/payments', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(payment)
			}).then(response => {
				console.log("response", response)
			})
		}
	}
});
