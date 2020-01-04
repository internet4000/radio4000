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

	// We want to disable the save button when either
	// 1) no changes have been made to the "proxy" object
	// 2) it's already saving/submitting
	hasNoChanges: computed('proxy.{title,slug,body,link}', function () {
		return Object.keys(this.proxy).length < 1
	}),
	disableSave: computed.or('hasNoChanges', 'submitTask.isRunning'),

	actions: {
		cancel() {
			get(this, 'onCancel')()
		},
		submit() {
			get(this, 'submitTask').perform(get(this, 'proxy'))
			set(this, 'proxy', {})
		}
	}
})
