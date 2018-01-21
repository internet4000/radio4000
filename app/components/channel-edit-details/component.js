import Ember from 'ember'

const {Component, get, set} = Ember

export default Component.extend({
	// channel: ember model,
	// proxy: empty object for storing changes
	// submitTask: ember concurrency task

	init() {
		this._super(...arguments)
		set(this, 'proxy', {})
	},

	actions: {
		cancel() {
			get(this, 'onCancel')()
		},
		submit() {
			const proxy = get(this, 'proxy')
			get(this, 'submitTask').perform(proxy)
		}
	}
})
