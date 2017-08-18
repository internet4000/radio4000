import Ember from 'ember';

const { Controller, computed } = Ember;

export default Controller.extend({
	userChannel: computed.alias('session.currentUser.channels.firstObject'),
	actions: {

		/* Payment object exemple
		 * received from stripe after sending
		 * the checkout transation
		 * it is sent to the backend api
		 *
		 * payment: {
		 * 	card: Object
		 * 	client_ip: "95.91.214.87"
		 * 	created: 1503074589
		 * 	email: "hu@hu.hu"
		 * 	id: "tok_1AsDYvCSxcuHyPxSjjSNPvSc"
		 * 	livemode: false
		 * 	object: "token"
		 * 	type: "card"
		 * 	used: false
		 * }
		 */

		/* Sends token to backend api
		 * `response` Object is the charged transaction
		 * the user processed
		 */
		processStripeToken(card, args) {
			console.log('card', card);
			console.log('args', args);
			fetch('http://localhost:3000/payments', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(card)
			}).then(response => {
				console.log("response", response)
			})
		}
	}
});
