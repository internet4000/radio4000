import Component from '@ember/component'
import { inject as service } from '@ember/service'
import {computed} from '@ember/object'
import {task} from 'ember-concurrency'

export default Component.extend({
	player: service('player'),

	tagName: 'button',
	classNames: ['Btn'],
	classNameBindings: ['clickTask.isRunning'],
	attributeBindings: ['disabled', 'title'],
	title: 'Play this radio',
	disabled: computed.reads('clickTask.isRunning'),

	// Display text in template or only icon
	showText: true,

	// Pass it a full `channel` model
	// channel: {}

	click() {
		this.get('clickTask').perform()
	},

	clickTask: task(function * () {
		yield this.get('player.playFirstTrack').perform(this.get('channel'))
	})
})
