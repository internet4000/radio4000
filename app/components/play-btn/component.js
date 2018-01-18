import Component from '@ember/component'
import { inject as service } from '@ember/service'
import {task} from 'ember-concurrency'

export default Component.extend({
	player: service('player'),

	tagName: 'button',
	classNames: ['Btn'],
	classNameBindings: ['clickTask.isRunning'],
	attributeBindings: ['title'],
	title: 'Play this radio',
	showText: true,
	// channel: {}

	click() {
		this.get('clickTask').perform()
	},

	clickTask: task(function * () {
		yield this.get('player.playFirstTrack').perform(this.get('channel'))
	})
})
