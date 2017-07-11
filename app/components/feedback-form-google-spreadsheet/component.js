import Ember from 'ember';
const { Component,
				inject,
				computed,
				get,
				setProperties,
				$ } = Ember;

// https://mashe.hawksey.info/2014/07/google-sheets-as-a-database-insert-with-apps-script-using-postget-methods-with-ajax-example/
// call this co,mpoenent as follow:
// {{feedback-form-google-spreadsheet scriptId="script-id"}}
// where `script-id` is the script id associated to the spreadsheet

export default Component.extend({
	session: inject.service('session'),
	flashMessages: inject.service('flashMessages'),

	scriptId: '',
	message: '',
	email: '',
	channelId: computed.alias('session.currentUser.channels.firstObject.id'),

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
				notification.success(`Thanks! Feedback sent.`);
			})
		}
	}
});
