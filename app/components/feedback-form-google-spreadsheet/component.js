import Component from '@ember/component'
import {get, computed} from '@ember/object'
import {inject as service} from '@ember/service'
import {task} from 'ember-concurrency'

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

	// scriptUrl
	message: '',
	email: '',

	clearForm() {
		this.setProperties({
			message: '',
			email: ''
		})
	},

	notValid: computed.empty('message'),
	userChannelId: computed('session.currentUser.channels.firstObject.id', function() {
		return get(this, 'session.currentUser.channels.firstObject.id') || ''
	}),
	playerChannelId: computed('player.currentChannel.id', function() {
		return get(this, 'player.currentChannel.id') || ''
	}),
	playerTrackId: computed('player.currentTrack', function() {
		return get(this, 'player.currentTrack.id') || ''
	}),

	sendFeedback: task(function * () {
		const notification = get(this, 'flashMessages')
		const scriptUrl = get(this, 'scriptUrl')

		const formData = new FormData()
		formData.append('message', get(this, 'message'))
		formData.append('email', get(this, 'email'))
		formData.append('userChannelId', get(this, 'userChannelId'))
		formData.append('playerChannelId', get(this, 'playerChannelId'))
		formData.append('playerTrackId', get(this, 'playerTrackId'))

		try {
			yield fetch(scriptUrl, {
				method: 'POST',
				body: formData
			})
			this.clearForm()
			notification.success('Thank you for the feedback!')
		} catch (err) {
			notification.warning(`Sorry, could not send feedback ${err}`)
		}
	}),

	actions: {
		submit() {
			if (get(this, 'botField')) {
				return
			}
			get(this, 'sendFeedback').perform()
		}
	}
})
