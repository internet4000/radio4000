import Ember from 'ember';

const {Controller, computed, get} = Ember;

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
		processStripeToken(card) {
			const messages = get(this, 'flashMessages');
			const charge = {
				stripeCard: card,
				radio4000ChannelId: get(this, 'userChannel.id')
			};

			messages.add({
				message: '(1/2) - Card authorized. Proceeding to payment',
				type: 'success',
				sticky: true
			});

			fetch('http://localhost:3000/payments', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(charge)
			}).then(response => {
				console.log('@processStripeToken:response', response);

				if (response.status > 299) {
					throw Error(response);
				}

				messages.add({
					type: 'success',
					message: '(2/2) - Payment success. Channel upgraded. Thank you!',
					sticky: true
				});
			}).catch(error => {
				messages.add({
					type: 'alert',
					message: '(2/2) - Payment failed (on the server). Card was not charged.',
					sticky: true
				});
				console.log(error);
			});
		}
	}
});
