import { inject as service } from '@ember/service';
import { empty } from '@ember/object/computed';
import Component from '@ember/component';
import { get, computed } from '@ember/object';
import $ from 'jquery';

/*
	 Source: https://mashe.hawksey.info/2014/07/google-sheets-as-a-database-insert-with-apps-script-using-postget-methods-with-ajax-example/
	 Required param: `scriptId` (on handlebar component)
	 {{feedback-form-google-spreadsheet scriptId="id"}}
	 where `id` is the script id associated to the spreadsheet you will
	 use to store the feedback data
 */

export default Component.extend({
	session: service(),
	player: service(),
	flashMessages: service(),

	message: '',
	email: '',
	scriptId: '',

	buildUrl: computed('scriptId', function () {
		const scriptId = get(this, 'scriptId');
		return `https://script.google.com/macros/s/${scriptId}/exec`;
	}),
	notValid: empty('message'),
	userChannelId: computed('session.currentUser.channels.firstObject.id', function () {
		return get(this, 'session.currentUser.channels.firstObject.id') || '';
	}),
	playerChannelId: computed('player.currentChannel.id', function () {
		return get(this, 'player.currentChannel.id') || '';
	}),
	playerTrackId: computed('player.currentTrack', function () {
		return get(this, 'player.currentTrack.id') || '';
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
			const url = get(this, 'buildUrl');
			const data = {
				message: get(this, 'message'),
				email: get(this, 'email'),
				userChannelId: get(this, 'userChannelId'),
				playerChannelId: get(this, 'playerChannelId'),
				playerTrackId: get(this, 'playerTrackId')
			};
			// Tried to use `fetch` instead of `$.ajax` but could not get
			// the Google Docs script to parse the incoming body.
			return $.ajax({
				url,
				type: 'post',
				data
			}).then(() => {
				this.clearData();
				notification.success('Thank you for the feedback!');
			});
		}
	}
});
