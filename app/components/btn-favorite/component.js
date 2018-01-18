import Ember from 'ember'
import Component from '@ember/component'
import { inject as service } from '@ember/service'
import {or, not} from 'ember-awesome-macros'

const { computed, get } = Ember

export default Component.extend({
	session: service(),

	tagName: 'button',
	classNames: ['Btn'],
	attributeBindings: ['title', 'disabled'],

	// Channel to be added as favorite to user.session
	channel: null,
	// Display text in template or only icon
	showText: true,

	hasChannel: computed.reads('session.content.currentUser.channels.firstObject'),
	disabled: or(not('hasChannel'), 'channel.toggleFavorite.isRunning'),
	title: computed('channel.isFavorite', {
		get() {
			if (!get(this, 'hasChannel')) {
				return 'You need to login and have a channel to add this one as favorite'
			}
			if (!get(this, 'channel.isFavorite')) {
				return 'Save this radio to your favorites'
			}
			return 'Remove this radio from your favorites'
		}
	}),

	click() {
		get(this, 'channel.toggleFavorite').perform()
	}
})
