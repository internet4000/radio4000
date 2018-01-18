import PlayButtonComponent from 'radio4000/components/play-btn/component'
import {task, timeout} from 'ember-concurrency'

export default PlayButtonComponent.extend({
	title: 'Play a random Radio4000 channel [⌨ r]',

	clickTask: task(function * () {
		yield this.get('player.playRandomChannel').perform()
		// After the above task finishes, <radio4000-player> still
		// needs to do stuff. We wait because it feels nicer #ux
		yield timeout(250)
	})
})
