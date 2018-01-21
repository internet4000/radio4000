import PlayButtonComponent from 'radio4000/components/play-btn/component'
import {task} from 'ember-concurrency'
import {or} from 'ember-awesome-macros'
import {computed} from '@ember/object'

export default PlayButtonComponent.extend({
	title: 'Play a random Radio4000 channel [⌨ r]',

	// Slightly different logic here so that the button also reacts
	// when the random channel task is running OUTSIDE of this component.
	// Like when you press the "R" shortcut.
	isRunning: or('player.playRandomChannel.isRunning', 'clickTask.isRunning'),
	disabled: computed.reads('isRunning'),

	clickTask: task(function * () {
		yield this.get('player.playRandomChannel').perform()
	})
})
