import Ember from 'ember';
const {
	Component,
	inject,
	computed,
	get,
	$
} = Ember;

/*
	 Source: https://mashe.hawksey.info/2014/07/google-sheets-as-a-database-insert-with-apps-script-using-postget-methods-with-ajax-example/
	 Required param: `scriptId` (on handlebar component)
	 {{feedback-form-google-spreadsheet scriptId="id"}}
	 where `id` is the script id associated to the spreadsheet you will
	 use to store the feedback data
 */

export default Component.extend({
	session: inject.service(),
	flashMessages: inject.service(),

	message: '',
	email: '',
	scriptId: '',

	buildUrl: computed('scriptId', function () {
		const scriptId = get(this, 'scriptId');
		return `https://script.google.com/macros/s/${scriptId}/exec`;
	}),
	notValid: computed.empty('message'),
	userChannelId: computed('session.currentUser.channels.firstObject.id', function () {
		return get(this, 'session.currentUser.channels.firstObject.id') || '';
	}),

	clearData() {
		this.setProperties({
			message: '',
			email: ''
		});
	},

	actions: {
		send() {
			const notification = get(this, 'flashMessages');
			const data = {
				message: get(this, 'message'),
				email: get(this, 'email'),
				userChannelId: get(this, 'userChannelId')
			};

			return $.ajax({
				url: get(this, 'buildUrl'),
				type: 'post',
				data
			}).then(() => {
				this.clearData();
				notification.success('Thank you for the feedback!');
			});
		}
	}
});
