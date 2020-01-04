import Component from '@ember/component'
import {get, set, computed} from '@ember/object'

export default Component.extend({
	// channel: ember model,
	// proxy: empty object for storing changes
	// submitTask: ember concurrency task

	init() {
		this._super(...arguments)
		set(this, 'proxy', {})
	},

	changesToSave: computed.notEmpty('proxy'),

	disableSave: computed.or('changesToSave', 'submitTask.isRunning'),

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
