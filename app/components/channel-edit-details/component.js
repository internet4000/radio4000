import Ember from 'ember'

const { Component, get, set, computed } = Ember

export default Component.extend({
	// channel: ember model,
	// proxy: empty object for storing changes
	// submitTask: ember concurrency task

	init() {
		this._super(...arguments)
		set(this, 'proxy', {})
	},

	nothingChanged: computed.not('channel.hasDirtyAttributes'),
	cantSave: computed.or('channel.validations.isInvalid', 'nothingChanged'),
	disableSubmit: computed.or('submitTask.isRunning', 'cantSave'),

	actions: {
		update(a, b) {
			console.log(a, b)
		},
		cancel() {
			get(this, 'onCancel')()
		},
		submit() {
			const proxy = get(this, 'proxy')
			const channel = get(this, 'channel')

			// console.log(proxy)
			const updated = Object.assign(channel, proxy)
			console.log(updated.get('title'))
			get(this, 'submitTask').perform(proxy)
		}
	}
})
