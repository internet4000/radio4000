import Ember from 'ember';
const { Component,
				inject,
				computed,
				get,
				setProperties,
				$ } = Ember;

/*
	 Source: https://mashe.hawksey.info/2014/07/google-sheets-as-a-database-insert-with-apps-script-using-postget-methods-with-ajax-example/
	 Required param: `scriptId` (on handlebar component)
	 {{feedback-form-google-spreadsheet scriptId="id"}}
	 where `id` is the script id associated to the spreadsheet you will
	 use to store the feedback data
 */

export default Component.extend({
	session: inject.service('session'),
	flashMessages: inject.service('flashMessages'),

	scriptId: '',
	message: '',
	email: '',
	channelId: computed('session.currentUser.channels.firstObject.id', function() {
		return get(this, 'session.currentUser.channels.firstObject.id') || '';
	}),

	notValid: computed.empty('message'),

	buildUrl() {
		return `https://script.google.com/macros/s/${this.scriptId}/exec`;
	},

	clearData() {
		this.setProperties({
			message: '',
			email: ''
		})
	},

	actions: {
		send() {
			const notification = get(this, 'flashMessages');

			let data = {
				message: get(this, 'message'),
				email: get(this, 'email'),
				channelId: get(this, 'channelId')
			}

      return $.ajax({
				url: this.buildUrl(),
				type: "post",
				data
			}).then(res => {
				this.clearData();
				notification.success(`Thanks for your feedback!`);
			})
		}
	}
});
