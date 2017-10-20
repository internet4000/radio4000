import Ember from 'ember'

const { Component, get, computed } = Ember

export default Component.extend({
	// props
	// channel: ember model,
	// submitTask: ember concurrency task

	nothingChanged: computed.not('channel.hasDirtyAttributes'),
	cantSave: computed.or('channel.validations.isInvalid', 'nothingChanged'),
	disableSubmit: computed.or('submitTask.isRunning', 'cantSave'),

	actions: {
		submit() {
			get(this, 'submitTask')()
		},
		cancel() {
			get(this, 'onCancel')()
		}
	}
})
